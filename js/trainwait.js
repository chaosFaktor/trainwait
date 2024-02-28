
let train_utilities = {
    attach_parts(partA, partB) {
        partA = partA.split("\n");
        partB = partB.split("\n");
        let out = "";

        for(let i = 0; i<partA.length; i++) {
            if (partA[i] === undefined || partB[i] === undefined) {
                
            } else {
                out += (partA[i] + partB[i] + "\n");
            }
        }
        return out;
    },
    truncate_left(train, limit) {
        let lines = train.split("\n");
        let out = "";
        lines.forEach(line=>{
            if (line.length > limit) {
                out+=line.substring(line.length-limit) + "\n";
            } else {
                out+=line + "\n";
            }
        })
        return out
    }
}



class Train {
    constructor() {
        this.frame = -1;
        this.max_frame = 6;

        this.trailor = "";
        this.trailor_types = ["hahn"];
    }
    build_train() {
        this.frame = (this.frame + 1) % this.max_frame;
        if (this.frame == 0) {
            return ` 
             O       
         ___      O  
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
 `;
        } else if (this.frame == 1) {
            return ` 
           o     O   
         ___         
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
 `;
        } else if (this.frame == 2) {
            return ` 
         .     O     
         ___         
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
            `;
        } else if (this.frame == 3) {
            return ` 
             O       
         ___      O  
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
 `;
        } else if (this.frame == 4) {
            return ` 
           o     O   
         ___         
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
 `;
        } else if (this.frame == 5) {
            return ` 
         .     O     
         ___         
 ___ooo  | |__n_i_][ 
[______]_|__________)
 0    0   0---0---0  
 `;
        }
    }
    build_trailor_hahn() {

    }
    construct_trailor() {
        let trailor = Math.floor(Math.random() * 7);
        let choice; let max_trunc;
        if (trailor == 0) {
            choice =  ` 
 ________________  
| Flyerservice   | 
|           Hahn | 
|________________|=
  O            O   
 `;
            max_trunc = 18;
        } else if (trailor == 1) {
            choice = ` 
 _____________  
(  CCC        ) 
(             ) 
(_____________)=
 O           O  
 `;
            max_trunc = 15;
        } else if (trailor == 2) {
            choice = ` 
    \\O/      
     |       
 _]_/_\\_[_   
(__________)=
 O        O  
 `;
            max_trunc = 12;
        } else if (trailor == 3) {
            choice = ` 
 ____________________   _________  
| Massenvernichtungs-|=(_________) 
| Waffeln            |  _][___][_  
|____________________|=(_________)=
 O                  O    O     O   
 `;
            max_trunc = 34;
        } else if (trailor == 4) {
            choice = ` 
         ____________________________   ___________________  
 _   _  | Nett hier! Aber waren Sie  |=| Wir k\u{00F2}nnen alles! | 
]_[=|M|=| schonmal im Maschinendeck? | | Au\u{00DF}er gulas.ch    | 
]_[     |____________________________|=|___________________|=
O O      O                          O    O               O   
 `;
            max_trunc = 60;
        } else if (trailor == 5) {
            choice = ` 
    
    
 _  
[M]=
O O 
 `;
            max_trunc = 3;
        } else if (trailor == 6) {
            choice = ` 
 ______   ____    
[______]=(____)   
 ||__||   _||___  
[______] (______)=
 O    O   O   O   
 `;
            max_trunc = 17;
        }

        return {
            content: choice,
            truncated: 0,
            max_truncated: max_trunc
        }

    }
}

let loop_interval;
function start_train() {
    let trainwait_pre = document.getElementById("trainwait-container");
    let train = new Train();

    let trailors = [];
    let current_trailor = train.construct_trailor();

    let first_loop = true;
    loop_interval = setInterval(event=>{
        if (first_loop) {
            first_loop = false;
        }
        let out = train.build_train();


        trailors.forEach(trailor=>{
            out = train_utilities.attach_parts(trailor.content, out);
        });
        if (current_trailor.truncated == current_trailor.max_truncated) {
            trailors.push(current_trailor);
            out = train_utilities.attach_parts(current_trailor.content, out);
            current_trailor = train.construct_trailor();
        } else {
            current_trailor.truncated++;
            out = train_utilities.attach_parts(train_utilities.truncate_left(current_trailor.content, current_trailor.truncated), out);
        }
        trainwait_pre.innerText = out;

        //out = train_utilities.attach_parts(out, train.build_train());


    }, 120);
}
function stop_train() {
    clearInterval(loop_interval);
}

start_train();

