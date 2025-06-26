export const Button = ({
	styles,
	onClick,
	text,
}: {
	styles?: string;
	onClick?: () => void;
	text: string;
}) => {
	return (
		<button type="submit" onClick={onClick} className={styles}>
			{text}
		</button>
	);
};
