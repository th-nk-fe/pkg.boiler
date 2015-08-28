var bower = require('bower');
var fs = require("fs");
var path = require('path');
var htmlwiring = require("html-wiring");

var folderList = [];
var fileList = [];
var scssFileList=[];
var folderCount;
var folderReadCount = 0;

var sections=[{
   prefix:"cssnew",
   styleguideSection:3,
   count:0
},{
   prefix:"pkg",
   styleguideSection:2,
   count:0
}];

var sectionId;
var subsectionid;
var subsectionCount = 0;
var subsubsectionCount = 0;
var currentFile;
var currentFolder = 0;
var fileCount=0;
var currentFolderName;


bower.commands.install().on('end', function (installed) {
    getFolders();
});

function setCurrentSectionId(prfx){
    var found = false;
    sections.forEach(function(section){
        if(section.prefix==prfx){
            found=true;
            sectionId = section.styleguideSection;
        }
    })
    return found;
}

function setSectionCount(id){
    sections.forEach(function(section){
        if(section.styleguideSection==id){
            section.count = section.count+1;
            subsectionid = section.count;
        }
    })
}

function getFolders(){
    fs.readdir('lib/components/', function (err, folders) {
        folderList = folders;
        folderCount = folderList.length;
        folderLoop(folders);
    })
}

function folderLoop(){
    
    if(currentFolder>folderCount-1) return;
    
    var folder = folderList[currentFolder]
    
    var folderType = folder.split('.')[0];
    
    if(setCurrentSectionId(folderType)){//check if section exists and set at same time
        getFiles(folder); 
    }
    else{
        currentFolder++;
        folderLoop(currentFolder);
    }
}

function getFiles(folder){
    scssFileList = [];
    currentFolderName = folder;
    fileCount = 0;
    fs.readdir('lib/components/'+folder, function (err, filelist) {
        folderReadCount++;
        //console.log("folder:"+folder)
        
        //store scss files
        filelist.forEach(function (file) {
            if(path.extname(file)=='.scss'){
                scssFileList.push(file);
            }
        })
        
        fileLoop();
       
    })
}


function fileLoop(){
    //console.log("fileloop")
    if(fileCount<scssFileList.length){
        analyseFile('lib/components/'+currentFolderName+'/'+scssFileList[fileCount]);
    }
    else{
        currentFolder++;
        folderLoop(currentFolder);
    }
}



function analyseFile(file){
    currentFile = file;
    var filedata = htmlwiring.readFileAsString(file);
    findComments(filedata);
}


function findComments(data){
    var subsectionCount = 0;
    var numberflag = false;
    var regex = /Styleguide [a-zA-z0-9.]+/g;
    var newdata = data.replace(regex,function (match,pos,str){
        //console.log("***************************************************")
        var sectionType = data.substr(pos+11).split('\n')[0].replace(/ /g,'');
        sectionType = sectionType.substr(0,sectionType.length-1);
        var sectionNumber;
        
        //check to see if section is a number (already imported) and changed back if so
        if(!isNaN(sectionType.replace(/\./g, ''))){
            numberflag = true;
            replaceNumbers();
        }
        else{
            replaceSections();
        }
        
        function replaceNumbers(){
            //console.log("replace numbers")
            sectionType = sectionType.replace(/\./g, '');
            var length = sectionType.length;
            
            if(length==2){
                sectionType="Section";
            }
            else if(length==3){
                sectionType="Subsection";
            }
            else if(length==4){
                sectionType="Subsubsection";
            }
            replaceSections();
        }
        
        function replaceSections(){
            //console.log(sectionType)
            if(sectionType==='Section'){
                setSectionCount(sectionId);
            }
            
            sectionNumber = "Styleguide "+sectionId+'.'+subsectionid
            
            if(sectionType==='Subsection'){
                subsectionCount++;
                sectionNumber+='.'+subsectionCount;
               
            }
            else if(sectionType==='Subsubsection'){
                sectionNumber+='.'+subsectionCount;
                subsubsectionCount++;
                sectionNumber+='.'+subsubsectionCount;
            }
        }
        //console.log(sectionNumber)
        return sectionNumber;
        
    });
    
    //write new data file
    fs.writeFile(currentFile,newdata,function(){
        fileCount++;
        fileLoop();
    });

}
