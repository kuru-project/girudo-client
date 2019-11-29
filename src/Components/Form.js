import React from 'react';
import {
	FormGroup,
	Label,
	Input
} from 'reactstrap';

const Form = ({onBlur, label, name, type, placeholder, onChange, defaultValue, required, ...props}) => {
	return(
		<React.Fragment>
			<FormGroup>
				<Label>{label}</Label>
				<Input
					name={name}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					defaultValue={defaultValue}
					style={required ? {border: 'solid 1px red'}: null }
				/>
			</FormGroup>
		</React.Fragment>
	)
}

export default Form;