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

                var list = document.getElementById("user-list");

                data.forEach(function(item, i, arr) {
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
                    list.appendChild(container);
                    animate(container);
                });


            });
        }

    }

    /* Attach the component to a DOM node */

    UsersList.attachTo('.list-container');

});