document.addEventListener('DOMContentLoaded', () => {

});

const render_view = (view) => {
    template_source = document.querySelector(view).innerHTML
    console.log(template_source)

    var template = Handlebars.compile(template_souirce);

    console.log({...model,...appState})
    var html_widget_element = template({...model,...appState})
}