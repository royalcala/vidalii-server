import { Client, ConnectConfig } from "ssh2";
import { remoteServer } from "./remoteServer.entity"

//TODO create dns name by server, this will be the id of the server

function createConnection(config: ConnectConfig, ready: (client: Client) => Promise<any>) {
    const client = new Client();
    return new Promise<void>(
        (resolve, reject) => {
            client.on('ready',
                async () => {
                    await ready(client)
                    client.end()
                    resolve()
                    // await this.ssh_check_uptime(conn_root)      
                    // await this.ssh_create_user_msserver_if_not_exist(this.conn_root)
                    // await this.ssh_create_conn_msserver(this.conn_root)
                    // const response1 = await this.ssh_start_nodejs(this.conn_msserver)
                    // const response2 = await this.ssh_start_ms_server(this.conn_msserver)
                    // this.conn_root.end();
                    // resolve([
                    //     response1,
                    //     response2
                    // ].join(', '))
                }).connect(
                    config
                )

        }
    )
}

type OptionsExec = {
    conn: Client,
    command: string,
    onClose?: (code, signal) => Promise<any>,
    onData?: (data) => Promise<any>,
    onDataError?: (data) => Promise<any>
    log?: boolean
}
function execCommand(
    {
        conn,
        command,
        onClose = async () => { },
        onData = async () => { },
        onDataError = async () => { },
        log = true
    }: OptionsExec
) {
    return new Promise<void>((resolve, reject) => {
        conn.exec(command, (err, stream) => {
            if (err) reject(err)
            stream.on('close', async (code, signal) => {
                if (log)
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                await onClose(code, signal)
                resolve()

            }).on('data', async (data: string) => {
                if (log)
                    console.log('STDOUT:' + data)
                await onData(data)
            }).stderr.on('data', async (data) => {
                if (log)
                    console.log('STDERR: ' + data)
                await onDataError(data)

            });
        })
    })
}

//remove user: userdel -r msserver
export class RemoteServerSSH {
    constructor(
        private config_root: remoteServer
    ) { }
    private config_msserver = {
        //TODO get from .env
        user: 'vidaliiserver',
        pass: 'Roy1*Alcala1*',
        // pass_md5() {
        //TODO check the equivalent perl to nodejs
        //     return crypto.createHash('sha1').update(this.pass).digest("hex");
        // }
    }
    async start_server_by_ssh() {
        const host = this.config_root?.dns || this.config_root.ip
        const port = 22
        createConnection({
            host,
            port,
            username: this.config_root.ssh_user,
            // privateKey: require('fs').readFileSync('/here/is/my/key')
            password: this.config_root.ssh_password
        },
            async (conn) => {
                //create msserver user
                await this.create_user_msserver(conn)

                console.log('***connecting with msserver***')
                await createConnection({
                    host,
                    port,
                    username: this.config_msserver.user,
                    password: this.config_msserver.pass
                },
                    async (conn) => {
                        await this.start_nodejs(conn)
                        await this.start_npx_vidalii_server(conn)
                    }
                )
            }
        )
    }
    private async create_user_msserver(conn: Client) {
        console.log(`***checking if exist user:${this.config_msserver.user}***`)
        //check the user
        return execCommand({
            conn,
            command: `id -u "${this.config_msserver.user}"`,
            onDataError: async () => {
                console.log('***creating user***')
                //create the user
                await execCommand({
                    conn,
                    command: `useradd ${this.config_msserver.user} --create-home --password $(perl -e 'print crypt($ARGV[0], "password")' '${this.config_msserver.pass}') --shell /bin/bash`,
                })
            }
        })
    }

    private async start_nodejs(conn: Client) {
        console.log('***starting nodejs***')
        const installNodejsCommand = `curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
        sudo apt-get install -y nodejs`
        //check if is installed node
        return execCommand({
            conn,
            command: `node -v`,
            onDataError: async () => {
                await execCommand({
                    conn,
                    command: installNodejsCommand,
                })
            }
        })
    }

    private async start_npx_vidalii_server(conn: Client) {
        console.log('*** starting @vidalii/ms-server ***')
        return execCommand({
            conn,
            command: `npx @vidalii/server-backend server-backend start --DB_PATH=$HOME/Documents/vidaliiServer`,
        })
    }
}