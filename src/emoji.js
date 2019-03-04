export let emojiObj = [ 
    { str: ":girl:", emoji: "👧" },
    { str: ":heart:", emoji: "❤️️" },
    { str: ":boy:", emoji: "👦" },
    { str: ":zombi:", emoji: "🧟" },
    { str: ":skull:", emoji: "💀" },
    { str: ":clown:", emoji: "🤡" },
    { str: ":bell:", emoji: "🔔" },
    { str: ":alien:", emoji: "👽" },
    { str: ":baby:", emoji: "👶" },
    { str: ":bacon:", emoji: "🥓" },
    { str: ":spider:", emoji: "🕷" },
 ];


 function emojiConvert(str){
    let x = emojiObj.map(check);
    function check(dat){
    
    if (str === dat.str){
      return dat.emoji;
    }
    else {
      return str;
    }
  };
    x.sort();
    let done = x.pop();
    return done;
   }