export type MatchStatus = "live" | "upcoming" | "finished";
export type Match = { id:string; status:MatchStatus; teamA:string; teamB:string; shortA:string; shortB:string; scoreA?:string; scoreB?:string; venue:string; time:string; result?:string; featured?:boolean };
export type Player = { id:string; name:string; role:string; initials:string; country:string; stats:{label:string;value:string}[]; form:string[] };

export const matches: Match[] = [
 {id:"ind-aus-1",status:"live",teamA:"India",teamB:"Australia",shortA:"IND",shortB:"AUS",scoreA:"178/4 (45.1)",scoreB:"Yet to bat",venue:"Ahmedabad · ODI",time:"LIVE",featured:true},
 {id:"ind-eng-2",status:"upcoming",teamA:"India",teamB:"England",shortA:"IND",shortB:"ENG",venue:"Mumbai · T20I",time:"Tomorrow · 7:00 PM",featured:true},
 {id:"csk-mi",status:"upcoming",teamA:"CSK",teamB:"MI",shortA:"CSK",shortB:"MI",venue:"Chennai · IPL",time:"Sat · 7:30 PM"},
 {id:"sa-nz",status:"finished",teamA:"South Africa",teamB:"New Zealand",shortA:"SA",shortB:"NZ",scoreA:"241/8",scoreB:"219 all out",venue:"Cape Town · ODI",time:"Finished",result:"South Africa won by 22 runs"}
];
export const players: Player[] = [
 {id:"virat-kohli",name:"Virat Kohli",role:"Top-order batter",initials:"VK",country:"India",stats:[{label:"ODI AVG",value:"58.18"},{label:"ODI RUNS",value:"13,906"},{label:"50s / 100s",value:"72 / 50"}],form:["45","112","0","68","89"]},
 {id:"jasprit-bumrah",name:"Jasprit Bumrah",role:"Fast bowler",initials:"JB",country:"India",stats:[{label:"ODI AVG",value:"23.55"},{label:"WICKETS",value:"149"},{label:"ECONOMY",value:"4.64"}],form:["2/28","4/39","1/21","3/34","2/18"]},
 {id:"smriti-mandhana",name:"Smriti Mandhana",role:"Opening batter",initials:"SM",country:"India Women",stats:[{label:"ODI AVG",value:"47.03"},{label:"ODI RUNS",value:"3,800+"},{label:"100s",value:"9"}],form:["74","12","86","45","101"]}
];
