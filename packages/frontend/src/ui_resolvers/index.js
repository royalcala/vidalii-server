export const useBackdrop = client => bool => client.writeData({
    data: {
        ui_loading_backdrop: bool,
    }
})

export const useMenuDrawer = client => open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
        return;
    client.writeData({
        data: {
            ui_menu_drawer: open
        }
    })
}
