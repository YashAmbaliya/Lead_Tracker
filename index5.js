const inputBtn = document.getElementById("input_btn");
const inputTxt = document.getElementById("input_ele");
const ulEle = document.getElementById("ul_ele");
const deleteBtn = document.getElementById("delete_btn");
const saveTabBtn = document.getElementById("save_tb_btn");

let myLeads = [];

const leadsFromLocalStrorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStrorage) {
    myLeads = leadsFromLocalStrorage;
    renderFun(myLeads);
}

function renderFun(Leads) {
    let listItem = "";

    for (let i = 0; i < Leads.length; i++) {
        // listItem += "<li><a target='_blank' href='" + myLeads[i] + "' >" + myLeads[i] + "</li>";
        listItem += `
            <li>
                <a target="_blank" href="${Leads[i]}">
                    ${Leads[i]}
                </a>
            </li>
        `;
    }

    ulEle.innerHTML = listItem;
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderFun(myLeads);
});

inputBtn.addEventListener("click", function () {
    myLeads.push(inputTxt.value);
    inputTxt.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderFun(myLeads);
    console.log(localStorage.getItem("myLeads"));
});

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderFun(myLeads);
    })

});

// for (let i = 0; i < myLeads.length; i++) {
//     // ulEle.innerHTML += "<li>" + myLeads[i] + "</li>";
//     const li = document.createElement("li");
//     li.textContent = myLeads[i];
//     ulEle.append(li);
// }

