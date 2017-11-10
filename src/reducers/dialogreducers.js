import * as types from '../constants/DialogsActionTypes';
import  update from 'react-addons-update';


export default function dialogsreducer(state={
    alert:{
        isOpen:false,
        type:'info'
    },
    confirm:{
        isOpen:false
    },
    prompt:{
        isOpen:false
    },
    notification:null
}, action={}) {

    switch (action.type) {

        case types.DIALOG_OPEN_ALERT:
            return update(state,{
                alert:{
                    $set: update(state.alert,{
                        message:{
                            $set: action.message
                        },
                        title:{
                            $set: action.title,
                        },
                        isOpen:{
                            $set: action.isOpen,
                        },
                        type:{
                            $set: action.typeDialog,
                        },
                        onClosed:{
                            $set: action.onClosed,
                        },
                    })
                }
            });


        case types.DIALOG_CLOSE_ALERT:
            return update(state,{
                alert:{
                    $set: update(state.alert,{
                        isOpen:{
                            $set: false
                        }
                    })
                }
            });

        case types.DIALOG_OPEN_CONFIRM:
            return update(state,{
                confirm:{
                    $set: update(state.confirm,{
                        message:{
                            $set: action.message
                        },
                        title:{
                            $set: action.title,
                        },
                        confirmLabel:{
                            $set: action.confirmLabel,
                        },
                        cancelLabel:{
                            $set: action.cancelLabel,
                        },
                        isOpen:{
                            $set: action.isOpen,
                        },
                        onClosed:{
                            $set: action.onClosed,
                        },
                    })
                }
            });

        // test

        case types.DIALOG_CLOSE_CONFIRM:
            return update(state,{
                confirm:{
                    $set: update(state.confirm,{
                        isOpen:{
                            $set: false
                        }
                    })
                }
            });

        case types.DIALOG_OPEN_PROMPT:
            return update(state,{
                prompt:{
                    $set: update(state.prompt,{
                        message:{
                            $set: action.message
                        },
                        title:{
                            $set: action.title,
                        },
                        isOpen:{
                            $set: action.isOpen,
                        },
                        onClosed:{
                            $set: action.onClosed,
                        },
                    })
                }
            });

        case types.DIALOG_CLOSE_PROMPT:
            return update(state,{
                prompt:{
                    $set: update(state.prompt,{
                        isOpen:{
                            $set: false
                        }
                    })
                }
            });
        case types.DIALOG_ADDNOTIFICATION:
            return update(state,{
                notification:{
                    $set: update(state.prompt,{
                        title:{
                            $set: action.title,
                        },
                        message:{
                            $set: action.message
                        },
                        level:{
                            $set: action.level,
                        },
                        position:{
                            $set: action.position,
                        },
                        autoDismiss:{
                            $set: action.autoDismiss,
                        },
                        dismissible:{
                            $set: action.dismissible,
                        },
                        action:{
                            $set: action.action,
                        },
                        onAdd:{
                            $set: action.onAdd,
                        },
                        onRemove:{
                            $set: action.onRemove,
                        },
                        uid:{
                            $set: action.uid,
                        }
                    })
                }
            });


        case types.DIALOG_CLEARNOTIFICATIONSTORE:
            return update(state,{
                notification: {
                    $set: null
                }
            });


        default:
            return state;

    }
};
