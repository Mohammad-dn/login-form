import styles from "./button.module.scss";
export const Button = ({
	onClick,
	text,
	disabled = false,
}: {
	onClick?: () => void;
	text: string;
	disabled?: boolean;
}) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			className={styles.customeButton}
			disabled={disabled}
		>
			{text}
		</button>
	);
};
