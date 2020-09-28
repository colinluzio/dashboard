const Helper = {
    //function to format text
    formatText: function(text: string): string {
        text = text.split("&eacute;").join("é");
        text = text.split("&quot;").join('"');
        text = text.split("&#039;").join("’");

        return text;
    }
};

export default Helper;
