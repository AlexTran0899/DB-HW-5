const yup = require('yup')
const positionOption = [
    "Quarterback",
    "Running Back",
    "Fullback",
    "Wide Receiver", 
    "Tight End",
    "Offensive Tackle",
    "Offensive Guard",
    "Center",
    "Defensive End",
    "Defensive Tackle",
    "Linebacker",
    "Cornerback",
    "Safety",
    "Nickelback",
    "Dimeback",
    "Kicker",
    "Punter",
    "Long Snapper",
    "Holder",
    "Kick Returner",
    "Punt Returner"
]

const playerCheck = yup.object({
    team_id: yup.number().required(),
    name: yup.string().min(3).required(),
    position: yup.string().oneOf(positionOption)
})

const validatePlayerInput = async (req,res,next) => {
    try{
        req.body =  await playerCheck.validate(req.body, {stripUnknown: true})
        next()
    } catch(err) {
        res.status(400).json(err.message)
    }
}

const gameCheck = yup.object({
    team_id1: yup.number().required(),
    team_id2: yup.number().required(),
    score1: yup.number().required(),
    score2: yup.number().required(),
    date : yup.date().required()
})

const validateGameInput = async (req,res,next) => {
    try{
        req.body = await gameCheck.validate(req.body, {stripUnknown: true})
        next()
    } catch(err) {
        res.status(400).json(err.message)
    }
}


module.exports = {validatePlayerInput, validateGameInput}