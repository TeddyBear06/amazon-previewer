const links = document.getElementsByClassName("a-link-normal");

for (var i = 0; i < links.length; i++) {
    let currentLink = links.item(i)

    let title = currentLink.lastChild.textContent

    let href = currentLink?.href

    let img = currentLink.firstChild.lastChild;
    let biggerImg = img?.dataset?.aHires

    if (biggerImg !== undefined) {
        tippy(currentLink, {
            onShown(instance) {
                if (href) {
                    let initialContent = instance.props.content
                    let newContent = initialContent + '<div style="text-align:center;"><h4>Récupération du prix en cours...</h4></div>'
                    instance.setContent(newContent);
                    fetch(href).then(function (response) {
                        return response.text()
                    }).then(function (html) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(html, "text/html");
                        jsonPrice = JSON.parse(doc.querySelector('.twister-plus-buying-options-price-data').innerHTML)
                        title = doc.querySelector('#productTitle').innerHTML
                        newContent = '<h3>'+ title +'</h3>' + initialContent + '<div style="text-align:center;"><h4>'+jsonPrice[0].displayPrice+'</h4></div>'
                        instance.setContent(newContent);
                    }).catch(function (err) {
                        console.warn('Something went wrong.', err);
                    });
                }
            },
            content: '<div style="text-align:center;"><img src="'+ biggerImg +'"></div>',
            allowHTML: true,
        });
    }
}