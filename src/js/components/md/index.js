export default {
    regFn(text, elArr) {
        //这里的条件有问题的
        switch (text.slice(0, 2)) {
            case "# ":
                var temp = document.createElement("h1");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            case "## ":
                var temp = document.createElement("h2");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            case "### ":
                var temp = document.createElement("h3");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            case "#### ":
                var temp = document.createElement("h4");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            case "##### ":
                var temp = document.createElement("h5");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            case "####### ":
                var temp = document.createElement("h6");
                temp.innerHTML = text.slice(2).trim();
                elArr.push(temp);
                break;
            default:
                var temp = document.createElement("p");
                temp.innerHTML = text.trim();
                elArr.push(temp);
                break;
        }
    }
}