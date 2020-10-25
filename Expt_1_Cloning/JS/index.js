$(document).ready(function(){
    var data='class Test implements Cloneable {\n&emsp;int a=0, b=0;\n&emsp;public Object clone() throws CloneNotSupportedException {\n&emsp;&emsp;Test t = (Test2)super.clone();\n&emsp;&emsp;return t;\n&emsp;}\n}\n\npublic class Main {\n&emsp;public static void main(String args[]) throws CloneNotSupportedException {\n&emsp;Test t1 = new Test2();\n&emsp;t1.a = 10;\n&emsp;t1.b = 20;\n&emsp;Test t2 = (Test2)t1.clone();\n&emsp;t2.a = 50;\n&emsp;Test t3 = t1;\n&emsp;t3.b = 30;\n&emsp;System.out.println(t1.a + " " + t1.b);\n &emsp;System.out.println(t2.a + " " + t2.b);\n&emsp;System.out.println(t3.a + " " + t3.b);\n&emsp;}\n}';

    var lines = data.split("\n");
    for(var i=0; i<lines.length;i++){
        var id = 'line'+i;
        $("#codeSection").append('<div class="px-1" style="font-size:18px; color:white; font-weight:bold;" id="'+id+'">'+lines[i]+'<div class="text-info px-1" style="font-size:16px; display:inline-block"></div></div>');
    }
    
    var lineNo=0,lineCount=8, prevLine, i=0,j;
    var sequence=[8,9,10,11,12,13,2,3,4,13,14,15,16,17,18,19,20];
    var span = document.getElementById('codeSection');
    $("#playBtn").show();
    $("#nextBtn").hide();
    $("#codeSection").hide();
    $("#simulation").hide();
    $("#info").hide();
    $("#finalValues").hide();
    
    $("#playBtn").click(function(){
        $(this).hide();
        $("#nextBtn").show();
        $("#codeSection").show();
        $("#simulation").show();
        $("#t1a,#t1b,#ta,#tb,#t2a,#t2b,#t3a,#t3b,#ML1,#ML1_ML2,#ML2,#t1Stack,#tStack,#t2Stack,#t3Stack,#info,#tab,#t2ab").hide();
    });
    
    $("#nextBtn").click(function(){
        lineCount = sequence[i];
        var line = span.children[lineCount];
        line.style.color="yellow";
        if(lineCount == 0){
            addComment(line.children[0],'&emsp;//Normal class Test to show Cloning which implements the Cloneable Interface');
        }
        else if(lineCount == 1){
            addComment(line.children[0],'&emsp;//Member variables declared here');
        }
        else if(lineCount == 2){
            addComment(line.children[0],'&emsp;//Overriding the Clone() method from Cloneable Interface which throws the checked exception  "CloneNotSupportedException"');
        }
        else if(lineCount == 3){
            addComment(line.children[0],'&emsp;//Creating new Object t of class Test and cloning it. Super keyword is used to refer parent clone() method');
            $("#ML1_ML2,#ML2,#tStack,#ta,#tb,#tab").show();
        }
        else if(lineCount == 4){
            addComment(line.children[0],'&emsp;//Returning the new cloned object t of class Test');
        }
        else if(lineCount == 8){
            addComment(line.children[0],'&emsp;//Driver Class(Which contains Main method)');
        }
        else if(lineCount == 9){
            addComment(line.children[0],'&emsp;//main method(entry point of the Code)');
        }
        else if(lineCount == 10){
            addComment(line.children[0],'&emsp;//Creating object t1 of class Test with the default constructor');
            $("#ML1,#t1a,#t1b,#t1Stack,#t2ab").show();
        }
        else if(lineCount == 11){
            addComment(line.children[0],'&emsp;//Chnaging values of member variables');
            addComment(span.children[1].children[0],'&emsp;//Member variables declared and initialized here');
            span.children[1].style.color="yellow";
            $("#ML1a").text("int a = 10");
            $("#t1av").text("10");
        }
        else if(lineCount == 12){
            addComment(line.children[0],'&emsp;//Chnaging values of member variables');
            $("#ML1b").text("int b = 20");
            $("#t1bv").text("20");
        }
        else if(lineCount == 13){
            clearHighlight(1);
            addComment(line.children[0],'&emsp;//Calling clone() method on object t1(Deep Copy)');
            if(lineNo==1){
                addComment(line.children[0],'&emsp;//Storing the returned object in object t2 of class Test(Deep Copy)');
                $("#tStack,#ta,#tb,#tab").hide();
                $("#t2Stack,#t2a,#t2b,#t2ab").show();
            }
            lineNo+=1;
        }
        else if(lineCount == 14){
            addComment(line.children[0],'&emsp;//Changing the value of variable a in object t2');
            addComment(span.children[1].children[0],'&emsp;//Member variable declared and initialized here');
            span.children[1].style.color="yellow";
            $("#t2av").text("50");
            $("#ML2a").text("int a = 50");
        }
        else if(lineCount == 15){
            clearHighlight(1);
            addComment(line.children[0],'&emsp;//Assigning the object t1 to the new object t3 of class Test(Shallow Copy)');
            $("#t3a,#t3b,#t3Stack").show();
        }
        else if(lineCount == 16){
            addComment(line.children[0],'&emsp;//Changing the value of variable b in object t3');
            addComment(span.children[1].children[0],'&emsp;//Member variable declared and initialized here');
            span.children[1].style.color="yellow";
            $("#ML1b").text("int b = 30");
            $("#t1bv,#t3bv").text("30");
        }
        else if(lineCount == 17){
            clearHighlight(1);
            addComment(line.children[0],'&emsp;//Printing the values of variables in t1');
            $("#info,#finalValues").show();
        }
        else if(lineCount == 18){
            addComment(line.children[0],'&emsp;//Printing the values of variables in t2');
        }
        else if(lineCount == 19){
            addComment(line.children[0],'&emsp;//Printing the values of variables in t3');
        }
        if(lineCount>19){
            clearHighlight(19);
            clearHighlight(20);
        }
        if(i>0){
            clearHighlight(sequence[i-1]);
        }
        i+=1;
    });
    
    function clearHighlight(count){
        prevLine = span.children[count];
        prevLine.style.color="white";
        prevLine.children[0].style.visibility="hidden";
    }
    
    function addComment(ele,text){
        ele.style.visibility = "visible";
        ele.innerHTML = text;
    }
    
    $("#resetBtn").click(function(){
        $("#playBtn").show();
        $("#nextBtn").hide();
        $("#codeSection").hide();
        $("#simulation").hide();
        $("#info").hide();
        $("#finalValues").hide();
        $("#t1av,#t1bv").text("0");
        $("#t2av").text("10");
        $("#ML2a").text("a = 10");
        $("#t3bv").text("20");
        if(lineCount>0){
            span.children[sequence[i-1]].style.color="white";
            span.children[sequence[i-1]].children[0].style.visibility="hidden";
            span.children[1].style.color="white";
            span.children[1].children[0].style.visibility="hidden";
        }
        i=0,lineNo=0;
    });        
});