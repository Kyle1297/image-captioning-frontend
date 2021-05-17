const extractFilename = (filename: string) => {
	return filename.substring(0, filename.lastIndexOf('.')) || filename;
};

export default extractFilename;
