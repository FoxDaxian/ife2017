//斜体函数
function testItalic(text) {
    let index = 0;
    let content = text.replace(/\*/g, function (key) {
        if (index !== 0) {
            return "</em>";
        }
        index++;
        return "<em>";
    });
    return content;
}

//粗体函数
function testBold(text) {
    let index = 0;
    let content = text.replace(/\*\*/g, function (key) {
        if (index !== 0) {
            return "</strong>";
        }
        index++;
        return "<strong>";
    });
    return content;
}


//删除线函数
function testDel(text) {
    let index = 0;
    let content = text.replace(/\~\~/g, function (key) {
        if (index !== 0) {
            return "</del>";
        }
        index++;
        return "<del>";
    });
    return content;
}

export default {
    regFn(text, elArr) {

        // https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3950968963,52198076&fm=117&gp=0.jpg 
        // https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3950968963,52198076&amp;fm=117&amp;gp=0.jpg
        //因为&被转义了
        
        // ![alt](https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1495100031&di=97f85f02a108af31f1d8189e471f08ae&src=http://imgsrc.baidu.com/forum/pic/item/d000baa1cd11728b9ac250a1c8fcc3cec2fd2c42.jpg "runoob")
        //判断图片
        if (/!\[.*\]\(https?\:\/\/.*\.jpe?g|png|gif|svg\s(\"\').*\1\)/.test(text)) {
            let alt = text.match(/\[.*\]/)[0].slice(1, -1),
            src = text.match(/\(.*\)/g)[0].split(" ")[0].slice(1),
            title = text.match(/\(.*\)/g)[0].split(" ")[1].slice(1,-2);
                

            let img = document.createElement("img");
            img.src = src;
            img.alt = alt;
            img.title = title;

            let temp = document.createElement("p");
            temp.appendChild(img);
            elArr.push(temp);
            return false;
        }


        //判断标题1-6
        if (/^#{1,6}\s/g.test(text)) {
            switch (text.match(/^#{1,6}\s/g)[0]) {
                case "# ":
                    var temp = document.createElement("h1");
                    temp.innerHTML = testBold(text.slice(2).trim());
                    elArr.push(temp);
                    break;
                case "## ":
                    var temp = document.createElement("h2");
                    temp.innerHTML = text.slice(3).trim();
                    elArr.push(temp);
                    break;
                case "### ":
                    var temp = document.createElement("h3");
                    temp.innerHTML = text.slice(4).trim();
                    elArr.push(temp);
                    break;
                case "#### ":
                    var temp = document.createElement("h4");
                    temp.innerHTML = text.slice(5).trim();
                    elArr.push(temp);
                    break;
                case "##### ":
                    var temp = document.createElement("h5");
                    temp.innerHTML = text.slice(6).trim();
                    elArr.push(temp);
                    break;
                case "###### ":
                    var temp = document.createElement("h6");
                    temp.innerHTML = text.slice(7).trim();
                    elArr.push(temp);
                    break;
            }
            return false;
        }



        //判断删除线
        if (/(\~\~)[^\~\~]*(\1)/g.test(text)) {
            var temp = document.createElement("p");
            temp.innerHTML = testDel(text);
            elArr.push(temp);
            return false;
        }

        //判断粗体
        if (/(\*\*)[^\*\*]*(\1)/g.test(text)) {
            var temp = document.createElement("p");
            temp.innerHTML = testBold(text);
            elArr.push(temp);
            return false;
        }

        //匹配斜体
        if (/(\*)[^\*]*(\1)/g.test(text)) {
            var temp = document.createElement("p");
            temp.innerHTML = testItalic(text);
            elArr.push(temp);
            return false;
        }


        //hr
        if (/(-|\*|_){3,}/g.test(text)) {
            var temp = document.createElement("hr");
            elArr.push(temp);
            return false;
        }

        var temp = document.createElement("p");
        temp.innerHTML = text.trim();
        elArr.push(temp);
    }
}