// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.762.42/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var tchmi_hotkeys;
        (function (tchmi_hotkeys) {
            function TcHmiButtonHotkeySetup(TcHmiButton, KeyCode) {

                // the KeyCodes you will use are found here.
                // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

                const debug = true; // set this to false to stop seeing console.logs.

                if (!TcHmiButton || !KeyCode) return;

                const buttonId = TcHmiButton.getId();
                const button = document.getElementById(buttonId);

                if (!button) {
                    console.error(`Button with ID ${buttonId} not found.`);
                    return;
                }

                const log = (message) => debug && console.log(message);

                function simulateEvent(eventName) {
                    log(`Simulating ${eventName} for ${buttonId}`);
                    button.dispatchEvent(new MouseEvent(eventName, {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    }));
                }

                function handleKeyDown(event) {
                    if (event.code === KeyCode) simulateEvent('mousedown');
                }

                function handleKeyUp(event) {
                    if (event.code === KeyCode) {
                        simulateEvent('mouseup');
                        simulateEvent('click');
                    }
                }

                log(`Adding keydown and keyup event listeners for ${buttonId}`);
                document.addEventListener('keydown', handleKeyDown);
                document.addEventListener('keyup', handleKeyUp);

                const destroyEvent = TcHmi.EventProvider.register(`${buttonId}.onDetached`, function (evt) {
                    log(`Removing keydown and keyup event listeners for ${buttonId}`);
                    document.removeEventListener('keydown', handleKeyDown);
                    document.removeEventListener('keyup', handleKeyUp);
                    evt.destroy();
                });

            }
            tchmi_hotkeys.TcHmiButtonHotkeySetup = TcHmiButtonHotkeySetup;
        })(tchmi_hotkeys = Functions.tchmi_hotkeys || (Functions.tchmi_hotkeys = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('TcHmiButtonHotkeySetup', 'TcHmi.Functions.tchmi_hotkeys', TcHmi.Functions.tchmi_hotkeys.TcHmiButtonHotkeySetup);
