import './styles/LoginInput.css';

const LoginInput = (props,clear) => {
    return (
        <div className="redact__min-square">
            <label htmlFor={props.value + props.name}>{props.name}</label>
            <input className="log_text" type="text" id={props.value + props.name} name={props.value} value={props.clear===true?"":props.value} onChange = {props.onChangeInputValue} />
        </div>
    );
};

export default LoginInput;