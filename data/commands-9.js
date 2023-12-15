db.friends.aggregate([
    {$group: {_id:{age:"$age"},allHobbies:{$push: "$hobbies"}} }
]
)