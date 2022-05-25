const arr=[
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "a man and a woman trying to cook a meal together in a modern kitchen.jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2022.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-may-2022.key"
    }
]
var cur=arr[0];

getTextWidth=(txt)=> {
  
    let text = document.createElement("span");
    document.body.appendChild(text);

    text.style.fontSize = 16 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = txt;

    width = Math.ceil(text.clientWidth);
    document.body.removeChild(text);
    return width;
}

 const binsearch1=(txt,lo,hi,maxlen)=>
{
    let ans=hi;
    while(lo<=hi)
    {
        let mid=Math.floor((lo+hi)/2);
        let ss=txt.substring(0,mid);
        let len=getTextWidth(ss,16);
        //console.log(getTextWidth(ss,16));
        if(len>maxlen)
        {
            hi=mid-1;
        }
        else{
            lo=mid+1;
            ans=mid;

        }
    }
    return ans;
}
const binsearch2=(txt,lo,hi,maxlen)=>
{
    let ans=lo;
    while(lo<=hi)
    {
        let mid=Math.floor((lo+hi)/2);
        let ss=txt.substring(mid,txt.length);
        let len=getTextWidth(ss,16);
        //console.log(getTextWidth(ss,16));
        if(len>maxlen)
        {
            lo=mid+1;
        }
        else{
            hi=mid-1;
            ans=mid;

        }
    }
    return ans;
}

const fun=(txt)=>{
    const obj=document.getElementById("sidebar");
    var wid=parseInt(obj.offsetWidth);
    wid=wid*0.65;
    let num1=binsearch1(txt,0,txt.length,Math.floor(wid/2));
    let num2=binsearch2(txt,0,txt.length,Math.floor(wid/2));
    console.log(num1,num2,txt);
    if(num1<num2)
    {
        return txt.substring(0,num1)+"..."+txt.substring(num2,txt.length);
    }
    return txt;
}
    
// const fun=(txt)=>{
//     var newtxt=txt;
//     if(txt.length>30)
//     {
//         newtxt=txt.substring(0,15)+"...."+txt.substring(txt.length-15,txt.length);
//     }
//     return newtxt;
// }
const short=()=>{
    arr.forEach((item)=>{
        item.shortname=fun(item.title);
    })
}
const titleChange=()=>
{
    const obj=document.getElementById("texts");
    obj.addEventListener("input",(e)=>
    {
        const txt=e.currentTarget.value;
        //console.log(txt);
        const it=document.querySelector(".curitem .title");
        var val=0;
        //console.log(it.innerHTML);
        for(let i=0;i<arr.length;i++)
            {
                if(arr[i].title===it.innerHTML) 
                {
                    val=i;
                }
            }
        //console.log(val);
        arr[val].title=txt;
        arr[val].shortname=fun(txt);
        it.innerHTML=fun(txt);

        //obj.innerHTML=txt;
        //console.log(it);
        //console.log(e.currentTarget);
    })
}
const removeCommands=()=>{
    const obj=document.getElementById("side");
    obj.remove();

}
const updateImage =(temp)=>
{

    const ele=document.getElementById("centerbar");
    ele.style.background=`url("${temp.previewImage}")`;
    ele.style.backgroundRepeat = "no-repeat";
    ele.style.backgroundPosition = "center center";
    ele.style.backgroundSize = "cover";
    // const newele=document.createElement("div");
    // newele.innerHTML=`
    // <img src="${temp.previewImage}" class="photo">
    // `;
    // ele.appendChild(newele);
}
const updateLabel=(temp)=>
{
    const ele=document.getElementById("texts");
    ele.value=temp.title;
}
const setactive=(e)=>{
    const it=document.querySelectorAll(".item");
    it.forEach((tmp)=>{
        tmp.classList.remove("curitem");
    })
    e.currentTarget.classList.add("curitem");
}
const  handle =(e)=>{
    const ele=e.currentTarget.children[1].innerHTML.trim();
    //console.log(ele);
    const item=arr.find((item)=>{
        if(item.shortname===ele)
        {
            return item;
        }
        //console.log(item.title);
    })
    //console.log(e.currentTarget);
    //console.log(item);
    setactive(e);
    updateImage(item);
    updateLabel(item);
}
const update = ()=>
{
    const ele=document.getElementById("sidebar");
    
    arr.forEach((item)=>{
        const newele=document.createElement("div");
        newele.classList.add("item");
        if(item===cur)
        {
            newele.classList.add("curitem");
        }
        const obj=`
        <img src="${item.previewImage}" class="thumbnail">
        <div class="title">${item.shortname}</div>                    
        `;
        newele.innerHTML=obj;
        newele.addEventListener("click",handle);
        ele.appendChild(newele);
        //ele.appendChild(newele);
        //console.log(ele);
        //console.log(`${item.previewImage}`);
    })

    updateImage(cur);
    updateLabel(cur);
    //console.log(ele);
}
const init =()=>{
    short();
    update();
    titleChange();
    //var  sss="djhbasjds";
    //console.log(sss.width);
}
document.addEventListener("keydown",(e)=>{
    //console.log(e);
    key=e.key;
    //console.log(key);
    const obj=document.querySelector(".curitem");
    if(key==="ArrowDown")
    {
        if(obj.nextElementSibling) obj.nextElementSibling.click();
    }
    if(key==="ArrowUp")
    {
        if(obj.previousElementSibling) obj.previousElementSibling.click();
    }
})


window.onload=init;

// funct("my  name is  yashjdadskndkskasn");


