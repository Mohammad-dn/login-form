import styles from "./button.module.scss";
export const Button = ({
	onClick,
	text,
	disabled = false,
	isLoading,
}: {
	onClick?: () => void;
	text: string;
	disabled?: boolean;
	isLoading?: boolean;
}) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			className={styles.customeButton}
			disabled={disabled}
		>
			{isLoading ? <span className={styles.loader}></span> : text}
		</button>
	);
};
