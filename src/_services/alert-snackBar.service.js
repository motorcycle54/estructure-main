let ref_componente = null;
let position = {
    top: true, 
    left: false, 
    right: true
}
let durationInSeconds = 5;
export class AlertSnackBarService{
    
    setReference(ref){
        ref_componente = ref;
    }

    showSuccessAlert(message, duration){
        ref_componente.position = position;
        ref_componente.duration = duration ? duration : durationInSeconds * 1000;
        ref_componente.message = message;
        ref_componente.type = "snack-bar-success"
        ref_componente.openSnackbar();
    }

    showWarningAlert(message, duration){
        ref_componente.position = position;
        ref_componente.duration = duration ? duration : durationInSeconds * 1000;
        ref_componente.message = message;
        ref_componente.type = "snack-bar-warning"
        ref_componente.openSnackbar();
    }

    showErrorAlert(message, duration){
        ref_componente.position = position;
        ref_componente.duration = duration ? duration : durationInSeconds * 1000;
        ref_componente.message = message;
        ref_componente.type = "snack-bar-error"
        ref_componente.openSnackbar();
    }
}