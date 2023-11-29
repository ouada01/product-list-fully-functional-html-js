function changelang() {
    let currentDirection = $('html').attr('dir');
    let newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
    $('html').attr('dir', newDirection);
}

function remvoveproduct(d, e) {
    $(`[data-id="${e}"]`).prop('checked', false);
    d.parentNode.remove();
    removeElement(forma(), e);
    calculateTotal();
    changelength();
}




function changelength() {
    if (forma().length == 0) {
        $("#empty").removeClass("hidden");
        $("#form").addClass("hidden");
    } else {
        $("#form").removeClass("hidden");
        $("#empty").addClass("hidden");
        $("#listlength").text(forma().length);

        if (forma().length > 5) {
            $('#scrollcontiner2').addClass(list3.join(" "));
        }
    }
}

function updateQte(array, id, newValue) {
    const index = array.findIndex(obj => obj.id === id);
    if (index !== -1) {
        array[index].qte = newValue;
        array[index].total = Number(newValue) * Number(array[index].price);
    }
    setForma(array);
}

function formacheck(e) {
    if ($(e).siblings().hasClass("onnn")) {
        $(e).siblings().css('max-height', $(e).siblings().data('height'));
        $(e).siblings().removeClass("onnn");
    } else {
        $(e).siblings().css('max-height', $(e).siblings().height());
        $(e).siblings().addClass("onnn");

        if ($(e).siblings().attr('data-height') === undefined) {
            $(e).siblings().attr("data-height", $(e).siblings().height());
        }

        $(e).siblings().css('max-height', '0');
    }
}

function removeElement(array, id) {
    const index = array.findIndex(obj => obj.id === id);

    if (index !== -1) {
        array.splice(index, 1);
    }

    setForma(array);
}

function scrolltocatlog(e, d) {
    let a = Number(e) - 1;
    if (colabs[a].classList.contains("onnn")) {
       
        colabs[a].style.maxHeight = colabs[a].dataset.height + "px";
        colabs[a].classList.remove("onnn");
    } else {
         colabs[a].style.maxHeight = colabs[a].dataset.height + "px";
         colabs[a].classList.add("onnn");
        if (colabs[a].dataset.height == undefined) {
            colabs[a].setAttribute('data-height', colabs[a].offsetHeight);
        }
    }

    catlogs[a].scrollIntoView({ behavior: 'smooth' });

  
    serv.forEach(e => e.classList.remove("active"));
    d.classList.add("active");
}


function calculateTotal() {
  
    let total2 = 0;
    let tax;

    forma().forEach(item => {
         if ('total' in item) {
             total2 += item.total;
        }
       tax = total2 * 0.19;

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