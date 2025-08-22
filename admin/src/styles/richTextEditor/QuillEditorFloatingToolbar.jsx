const colors = ["red", "green", "blue", "orange", "violet", "black", "white", "yellow", "gray", "pink"];
const fonts = ["arial", "serif", "monospace", "courier-new", "comic-sans-ms", "times-new-roman", "georgia"];
const headers = [1, 2, 3, 4, 5, 6]; // You can adjust this to include more or fewer headers

const formats = [
	[
		{
			className: "ql-font",
			options: fonts,
		},
		{
			className: "ql-size",
			options: ["small", false, "large", "huge"],
		},
	],
	[{ className: "ql-bold" }, { className: "ql-italic" }, { className: "ql-underline" }, { className: "ql-strike" }],
	[
		{
			className: "ql-color",
			options: colors,
		},
		{
			className: "ql-background",
			options: colors,
		},
	],
	[
		{
			className: "ql-script",
			value: "sub",
		},
		{
			className: "ql-script",
			value: "super",
		},
	],
	[
		...headers.map((value) => ({ className: `ql-header`, value: `${value}` })),
		{
			className: "ql-blockquote",
		},
		{
			className: "ql-code-block",
		},
	],
	[
		{
			className: "ql-list",
			value: "ordered",
		},
		{
			className: "ql-list",
			value: "bullet",
		},
		{
			className: "ql-indent",
			value: "-1",
		},
		{
			className: "ql-indent",
			value: "+1",
		},
	],
	[
		{
			className: "ql-direction",
			value: "rtl",
		},
		{
			className: "ql-align",
			options: [false, "right", "center", "justify"],
		},
	],
	[{ className: "ql-link" }, { className: "ql-image" }, { className: "ql-video" }, { className: "ql-formula" }],
	[{ className: "ql-clean" }], // This button will remove all formats
];

const renderOptions = (formatData) => {
	const { className, options } = formatData;
	return (
		<select className={className}>
			<option selected="selected"></option>
			{options.map((value, index) => {
				return <option value={value} key={index}></option>;
			})}
		</select>
	);
};

const renderSingle = (formatData) => {
	const { className, value } = formatData;
	return <button className={className} value={value}></button>;
};

const QuillEditorFloatingToolbar = () => (
	<div id="toolbar">
		{formats.map((classes, index) => {
			return (
				<span className="ql-formats" key={index}>
					{classes.map((formatData) => {
						return formatData.options ? renderOptions(formatData) : renderSingle(formatData);
					})}
				</span>
			);
		})}
	</div>
);

export default QuillEditorFloatingToolbar;
