// Function to toggle the language direction (LTR to RTL and vice versa)
function changelang() {
    // Get the current direction of the HTML element
    let currentDirection = $('html').attr('dir');

    // Toggle between "ltr" and "rtl"
    let newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';

    // Set the new direction for the HTML element
    $('html').attr('dir', newDirection);
}

// Function to remove a product
function remvoveproduct(d, e) {
    // Uncheck the checkbox with the corresponding data-id
    $(`[data-id="${e}"]`).prop('checked', false);
    
    // Remove the parent node of the current element (d)
    d.parentNode.remove();

    // Remove the element from the result of the forma() function
    removeElement(forma(), e);

    // Calculate the total after removing the product
    calculateTotal();

    // Update the length (or any other relevant information)
    changelength();
}




// Function to change the length of the form or take related actions
function changelength() {
    // Check if the length of the result of the forma() function is 0
    if (forma().length == 0) {
        // If the length is 0, show the "empty" element and hide the "form" element
        $("#empty").removeClass("hidden");
        $("#form").addClass("hidden");
    } else {
        // If the length is not 0
        // Show the "form" element and hide the "empty" element
        $("#form").removeClass("hidden");
        $("#empty").addClass("hidden");

        // Update the text content of the element with ID "listlength" with the length of forma()
        $("#listlength").text(forma().length);

        // Check if the length of forma() is greater than 5
        if (forma().length > 5) {
            // If true, add additional classes to the element with ID "scrollcontiner2"
            $('#scrollcontiner2').addClass(list3.join(" "));
        }
    }
}

// Function to update the quantity (qte) and total of an item in the array
function updateQte(array, id, newValue) {
    // Find the index of the item in the array based on its id
    const index = array.findIndex(obj => obj.id === id);

    // Check if the item with the specified id is found in the array
    if (index !== -1) {
        // Update the quantity (qte) of the item with the new value
        array[index].qte = newValue;

        // Update the total of the item based on the new quantity and its price
        array[index].total = Number(newValue) * Number(array[index].price);
    }

    // Update the state or data structure containing the array
    setForma(array);
}

// Function to toggle the visibility of a sibling element
function formacheck(e) {
    // Check if the siblings have the class "onnn"
    if ($(e).siblings().hasClass("onnn")) {
        // If they have the class, set the max-height to the data-height value
        $(e).siblings().css('max-height', $(e).siblings().data('height'));

        // Remove the class "onnn"
        $(e).siblings().removeClass("onnn");
    } else {
        // If they don't have the class
        // Set the max-height to the current height
        $(e).siblings().css('max-height', $(e).siblings().height());

        // Add the class "onnn"
        $(e).siblings().addClass("onnn");

        // Check if the data-height attribute is undefined
        if ($(e).siblings().attr('data-height') === undefined) {
            // Set the data-height attribute to the current height
            $(e).siblings().attr("data-height", $(e).siblings().height());
        }

        // Set the max-height to 0 to hide the element
        $(e).siblings().css('max-height', '0');
    }
}

// Function to remove an element from an array based on its id
function removeElement(array, id) {
    // Find the index of the element in the array based on its id
    const index = array.findIndex(obj => obj.id === id);

    // Check if the element with the specified id is found in the array
    if (index !== -1) {
        // Remove the element at the found index from the array
        array.splice(index, 1);
    }

    // Update the state or data structure containing the array
    setForma(array);
}

// Function to scroll to a catalog item, toggle its visibility, and update the active state of service items
function scrolltocatlog(e, d) {
    // Calculate the index based on the provided parameter
    let a = Number(e) - 1;

    // Check if the catalog item has the class "onnn"
    if (colabs[a].classList.contains("onnn")) {
        // If it has the class, set the max-height to the data-height value
        colabs[a].style.maxHeight = colabs[a].dataset.height + "px";
        
        // Remove the class "onnn"
        colabs[a].classList.remove("onnn");
    } else {
        // If it doesn't have the class
        // Set the max-height to the data-height value
        colabs[a].style.maxHeight = colabs[a].dataset.height + "px";
        
        // Add the class "onnn"
        colabs[a].classList.add("onnn");

        // Check if the data-height attribute is undefined
        if (colabs[a].dataset.height == undefined) {
            // Set the data-height attribute to the offsetHeight value
            colabs[a].setAttribute('data-height', colabs[a].offsetHeight);
        }
    }

    // Scroll to the catalog item with a smooth behavior
    catlogs[a].scrollIntoView({ behavior: 'smooth' });

    // Remove the "active" class from all service items and add it to the clicked item
    serv.forEach(e => e.classList.remove("active"));
    d.classList.add("active");
}

// Function to calculate and update the total and tax based on the items in the form
function calculateTotal() {
    // Initialize the total to 0
    let total2 = 0;
    
    // Initialize the tax variable
    let tax;

    // Iterate over each item in the result of the forma() function
    forma().forEach(item => {
        // Check if the item has a "total" property
        if ('total' in item) {
            // Add the total of the item to the overall total
            total2 += item.total;
        }

        // Calculate tax as 19% of the total
        tax = total2 * 0.19;

        // Update the text content of elements with IDs "tax" and "total"
        $("#tax").text((tax).toFixed(2));
        $("#total").text((total2 + tax).toFixed(2));
    });
}


function addRow(id,qte,price,name,disc,total){
    document.querySelector("#forma").insertAdjacentHTML('beforeend', ` 
    <div data-remove="${id}" class="w-full py-2.5 flex border-b border-black/10">
                        <div>
                            <p class="text-base font-bold">${name}</p>
                            <p class="text-sm text-gray-500">${disc}</p>
                            <p class="text-sm text-gray-500">Qte: <span id="qte" data-changer="${id}" class="me-2 font-bold">${qte}</span> price: <span class="font-bold">$</span><span
                                    id="price" class=" font-bold">${price.toFixed(2)}</span></p>
                        </div>
                        <p total class="text-base ms-auto font-bold">$<span data-changer2="${id}">${total.toFixed(2)}</span></p>
                        <div onclick="remvoveproduct(this,'${id}')" class="cursor-pointer ms-2 mt-0.5">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.69995 3.8H14.3M3.09995 3.8V13.6C3.09995 14.3732 3.72675 15 4.49995 15H11.5C12.2732 15 12.9 14.3732 12.9 13.6V3.8M5.19995 3.8V2.4C5.19995 1.6268 5.82675 1 6.59995 1H9.39995C10.1732 1 10.8 1.6268 10.8 2.4V3.8"
                                    stroke="#f76868" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M9.39978 7.29993V11.4999" stroke="#f76868" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M6.6001 7.29993V11.4999" stroke="#f76868" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>  
    `);
}