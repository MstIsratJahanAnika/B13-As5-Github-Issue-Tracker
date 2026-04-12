const btnsContainer = document.getElementById("btns-container");

const totalIssueCount = document.getElementById("totalIssueCount");

const loadingSpinner = document.getElementById("loading-spinner");

// all issues array
let allIssues = [];

const showloading = () =>{
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    allIssuesContainer.innerHTML = ""; //spinner show while no card loaded
}
const hideLoading = ()=>{
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");
}

// buttons load function
async function loadAllButtons(){
    // show loading spinner

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data); //data property load -> success

    allIssues = data.data;

    btnsContainer.innerHTML = "";

    // 'All' button
    const allBtn = document.createElement('button');
    allBtn.className = "load-btns active-btn w-[120px] py-2 px-3 rounded-sm capitalize active-btn";
    allBtn.textContent = 'All';
    allBtn.onclick = () => selectBtnCategory("All", allBtn);
    btnsContainer.appendChild(allBtn);

    const filterBtn = [];
    allIssues.forEach(issue => {
        if(!filterBtn.includes(issue.status)){
            filterBtn.push(issue.status);
        }
    });

    // btn er status property dhore 
    filterBtn.forEach(status =>{
        const btn = document.createElement('button');
        btn.className = "load-btns neutral-btn w-[120px] py-2 px-3 rounded-sm capitalize";
        btn.textContent = status; //btn er je nam thakbe

        btn.onclick = () => selectBtnCategory(status, btn);
        btnsContainer.appendChild(btn);
    });

    // total number of issues jekhane dekhabe
    totalIssueCount.innerText = `${allIssues.length} Issues`;

    // hide loading spinner
};

// any button a click korle je function hobe
const selectBtnCategory = async(categoryStatus, btn) =>{
    // show loading spinner

    const allTypeBtn = document.querySelectorAll('#btns-container button');
    console.log(allTypeBtn);

    allTypeBtn.forEach(button => {
        button.className= 'neutral-btn w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm capitalize';

    })
    // clicked button highlight
    btn.className = "load-btns active-btn w-[120px] py-2 px-3 rounded-sm capitalize ";

    let filteredIssues = [];

    if(categoryStatus === "All"){
        filteredIssues = allIssues;
    }
    else{
        filteredIssues = allIssues.filter(issue => issue.status === categoryStatus);

    }

    displayAllIssues(filteredIssues);
    totalIssueCount.innerText = `${filteredIssues.length} Issues`;

    // hide loading spinner
}

// calculate total count of issues
function totalCount(){
    document.getElementById("totalIssueCount").innerText = allIssuesContainer.children.length;
}
loadAllButtons();