function animate(element) {
    $(element).velocity({ translateX: "-100px" }, {duration: 0});
    $(element).velocity({opacity: "1", translateX: "0"}, {duration: 800, easing: [60, 10]});
}

function generateTemplate(data) {
    // в реальности здесь бы вызвался шаблонизатор
    var fragment = document.createDocumentFragment();
    var header = document.createElement('h4');
    var phone = document.createElement('p');
    var deleteLink = document.createElement('a');
    deleteLink.className = 'secondary-content';
    deleteLink.innerHTML = '<i class="remove mdi-action-highlight-remove"></i>';
    header.textContent = data.name;
    phone.textContent = data.phone;
    fragment.appendChild(deleteLink);
    fragment.appendChild(header);
    fragment.appendChild(phone);
    return fragment;
}

$(function() {


    /* Component definition */

    var UsersList = flight.component(users);

    function users() {
        this.doSomething = function() { /* ... */ }
        this.doSomethingElse = function() { /* ... */ }

        // after initializing the component
        this.after('initialize', function() {
            this.on('click', this.doSomething);
            this.on('mouseover', this.doSomethingElse);
            init();
        });

        function init(){
            User.load(function (tmp, data){

                var item = data[1];

                var container = document.createElement('li');
                container.setAttribute('data-id', item.id);
                container.className = 'waves-effect waves-orange';
                container.appendChild(generateTemplate(item));
                container.style.opacity = 0;
                if (item instanceof Student && item.strikes === 1) {
                    container.classList.add('lime');
                }
                if (item instanceof Student && item.strikes > 1) {
                    container.classList.add('blue-grey');
                }
                document.getElementById("user-list").appendChild(container);
                animate(container);
            });
        }

    }

    /* Attach the component to a DOM node */

    UsersList.attachTo('.list-container');

});