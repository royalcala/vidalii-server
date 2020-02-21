export const useBackdrop = client => bool => client.writeData({
    data: {
        ui_loading_backdrop: bool,
    }
})