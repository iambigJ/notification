let url = `mongodb://${process.env.DBhost}:${process.env.DBport}/${process.env.DBname}?authMechanism=DEFAULT&authSource=admin`
if(process.env.DBuser && process.env.DBpassword){
    url = `mongodb://${process.env.DBuser}:${process.env.DBpassword}@${process.env.DBhost}:${process.env.DBport}/${process.env.DBname}?authMechanism=DEFAULT&authSource=admin`
}

module.exports = {
    DBname_ENV: process.env.DBname,
    DBport_ENV: process.env.DBport,
    DBhost_ENV: process.env.DBhost,
    DBuser_ENV: process.env.DBuser,
    DBpassword_ENV: process.env.DBpassword,
    DBurl_ENV: url,
};
