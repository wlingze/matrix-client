import React, { ReactElement } from "react";

interface DialogContainerProps {
    // info 
    content: ReactElement;

    // confirm 
    confirmButton?: boolean;
    confirmButtonText?: string;
    onConfirm?: () => void;

    // cancel 
    cancelButton?: boolean;
    cancelButtonText?: string;
    onCancel?: () => void;

    // bottom info
    bottom?: ReactElement;
}

// export default class App extends React.Component<AppProps, AppState> {
export default class DialogContainer extends React.Component<DialogContainerProps>{

    constructor(props: DialogContainerProps) {
        super(props)
    }

    private onConfirmButtonClick = () => {
        this.props.onConfirm!();
    }

    private onCancelButtonClick = () => {
        this.props.onCancel!();
    }

    render(): React.ReactNode {

        let confirm: ReactElement | undefined = undefined
        if (this.props.confirmButton) {
            confirm = (
                <button onClick={this.onConfirmButtonClick}>
                    {this.props.confirmButtonText}
                </button>
            )
        }

        let cancel: ReactElement | undefined = undefined
        if (this.props.cancelButton) {
            cancel = (
                <button onClick={this.onCancelButtonClick}>
                    {this.props.cancelButtonText}
                </button>
            )
        }

        return (
            <div>
                {this.props.content}
                <div>
                    {confirm}
                    {cancel}
                </div>
                {this.props.bottom}
            </div>
        )
    }
}