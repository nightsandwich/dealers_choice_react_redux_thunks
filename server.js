const express = require('express');
const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());
app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/venues', async(req, res, next)=> {
  try {
    res.send(await Venue.findAll({
      include: [
        {
          model: Neighborhood
        }
      ],
      order: [
          ['name', 'ASC']
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/neighborhoods', async(req, res, next)=> {
  try {
    res.send(await Neighborhood.findAll({
      include: [
          {
              model: Venue,
          }
      ],
      order: [
        ['name', 'ASC']
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/neighborhoods/:id', async(req, res, next)=> {
  try {
    res.send(await Neighborhood.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/venues', async(req, res, next)=> {
    try {
      //console.log('reqbody:',req.body);
      const venue = await Venue.create(req.body);
      //console.log(venue);
      res.status(201).send(venue);
    }
    catch(ex){
      next(ex);
    }
  });

app.post('/api/neighborhoods', async(req, res, next)=> {
  try {
    //console.log('reqbody:',req.body);
    const neighborhood = await Neighborhood.create(req.body);
    //console.log(venue);
    res.status(201).send(neighborhood);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/venues/:id', async(req, res, next) =>{
  try{
    const venue = await Venue.findByPk(req.params.id);
    res.send(await venue.destroy());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/venues/:id', async(req, res, next) => {
  try{
    const venue = await Venue.findByPk(req.params.id);
    //console.log(venue);
    //console.log('reqbody:',req.body);
    await venue.update(req.body);
    //console.log(venue);
    res.send(venue);
  }
  catch(ex){
    next(ex);
  }
})

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_redux_db');

const Venue = conn.define('venue', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'stock.png'
  },
  website: {
    type: STRING,
    defaultValue: 'https://www.yelp.com/'//need to insert
  },
  visited: {
    type: BOOLEAN,
    defaultValue: false,
  }
});

const Neighborhood = conn.define('neighborhood', {
  name: {
      type: STRING
  }
})

Venue.belongsTo(Neighborhood);
Neighborhood.hasMany(Venue);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const banter = await Venue.create({name: 'Banter', imageUrl: 'http://banterbrooklyn.com/wp-content/uploads/2011/03/headon.jpg', website: 'https://banterbrooklyn.com/'});
  const forma = await Venue.create({name: 'Forma', imageUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/9siBwTJADkeBunhZLbND3A/o.jpg', website: 'https://www.formapasta.com/'});
  const vital = await Venue.create({name: 'Vital', imageUrl: 'https://images.squarespace-cdn.com/content/v1/5a01fd2db1ffb6985b2a9ac5/1619815760848-MOJK5RP23L0HQKBWLFIS/VITAL_Brooklyn_MadeleineChanStanley_4_2021-6.jpg', website: 'https://www.vitalclimbinggym.com/brooklyn'});
  const diandi = await Venue.create({name: 'Di an Di', imageUrl: 'https://pyxis.nymag.com/v1/imgs/bca/c93/26d1117e38ba63e4c60279ffcd8d5bbb39-di-and-di-06.rsocial.w1200.jpg', website: 'https://www.diandi.nyc/'});
  const metrorock = await Venue.create({name: 'Metrorock', imageUrl: 'https://cdn.shortpixel.ai/spai/w_1082+q_lossy+ret_img+to_webp/https://bushwickdaily.com/wp-content/uploads/2021/04/N_moyr-yYhYbnzg5_PLs4Q-1024x768.jpg', website: 'https://www.metrorock.com/bushwick'});
  const chezoskar = await Venue.create({name: 'Chez Oskar', imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/01/78/26/bb/front-street-view.jpg', website: 'http://www.chezoskar.com/'});
  const reliq =await Venue.create({name: 'The City Reliquary', imageUrl: 'https://i1.wp.com/www.cityreliquary.org/wp-content/uploads/2009/07/CR.jpg', website: 'https://www.cityreliquary.org/'}); 
  const goldenyears = await Venue.create({name: 'Golden Years', imageUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/TG42_mjKbvXqUwHCSfsrjw/o.jpg', website: 'https://goldenyearsbk.com/'});
  const kashkar = await Venue.create({name: 'Cafe Kashkar', imageUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/uRumZek8kEPdXRIl87x1Pw/o.jpg', website: 'https://www.kashkar-cafe.com/'}); 
  const sofreh = await Venue.create({name: 'Sofreh', imageUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/mNzvusg3a8oBfht1qiMzzg/o.jpg', website: 'https://www.sofrehnyc.com/menu'});  
  
  const wburg = await Neighborhood.create({name: 'Williamsburg'});
  const greenpoint = await Neighborhood.create({name: 'Greenpoint'});
  const bedstuy = await Neighborhood.create({name: 'Bed-Stuy'});
  const bushwick = await Neighborhood.create({name: 'Bushwick'});
  const crownheights = await Neighborhood.create({name: 'Crown Heights'});
  const brighton = await Neighborhood.create({name: 'Brighton Beach'});
  
  banter.neighborhoodId = wburg.id;
  forma.neighborhoodId = wburg.id;
  vital.neighborhoodId = wburg.id;
  diandi.neighborhoodId = greenpoint.id;
  metrorock.neighborhoodId = bushwick.id;
  chezoskar.neighborhoodId = bedstuy.id;
  reliq.neighborhoodId = wburg.id;
  goldenyears.neighborhoodId = wburg.id;
  kashkar.neighborhoodId = brighton.id;
  sofreh.neighborhoodId = crownheights.id;

  Promise.all([
    banter.save(),
    forma.save(),
    vital.save(),
    diandi.save(),
    metrorock.save(),
    chezoskar.save(),
    reliq.save(),
    goldenyears.save(),
    kashkar.save(),
    sofreh.save()
  ])
};

init();