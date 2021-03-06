const express = require('express');
const mongoose = require('mongoose');
const ExerciseModel = require('./models/Exercise');
const UserModel = require('./models/User');
const Router = express.Router();
/*******************************************************
 * Connexion à la base de donnée en ligne
 * 
 * nom de la base de données ExerciseTracker
 *******************************************************/
mongoose.connect("mongodb+srv://osalam:11QQWPEE31mxdSAR@cluster0.kqvok.mongodb.net/ExerciseTracker?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
/***********************************************************************
 * 
 * Definition de la route /api/users
 * 
 * Il permet l'ajout des utilisateurs dans la base de données
 * 
 * La récupération de la liste des utilisateurs dans la base de données
 * 
 ************************************************************************/

Router.route("/api/users")
  .get(async function(req, res) {
    let userCollections = await UserModel.find({})
    let responseObjet = userCollections.map(function(user) {
      return {
        username: user.username,
        _id: user._id
      }
    });

    return res.json(responseObjet);

  })
  .post(async function(req, res) {
    await UserModel.create(req.body, function(error, dataUser) {
      if (error) throw error;
      return res.json(dataUser);
    });
  });


/*************************************************************************
 * 
 * Definitions de la route pour l'ajout des exercices d'un utilisateur
 * 
 * retourne un object avec toutes les informations(user and exercise)
 * 
 *************************************************************************/

Router.route('/api/users/:userId/exercises')
  .post(async function(req, res) {
    let { userId } = req.params;

    ExerciseModel.create({ ...req.body, userId: req.params.userId }, function(error, exerciceData) {
      if (error) throw error;

      UserModel.findById(userId, function(error, userData) {

        if (error) throw error;

        let responseObject = {
          username: userData.username,
          _id: userData._id,
          description: exerciceData.description,
          date: new Date(exerciceData.date).toDateString(),
          duration: exerciceData.duration
        };
        return res.json(responseObject);
      })

    })
  });


let valideUserId = function(req, res, next) {
  let { userId } = req.params;
  UserModel.findById(userId)
    .exec(function(error, userData) {
      if (!userData) return res.json({});
      next();
    })
}
let detailHandler = (userId, req, res) => {
  ExerciseModel.find({ userId })
    .populate("userId")
    .exec(function(error, exercisesData) {
      let log = exercisesData.map(function(exercise) {
        return {
          description: exercise.description,
          date: new Date(exercise.date).toDateString(),
          duration: exercise.duration,
        }
      });

      UserModel.findById(userId)
        .exec(function(error, userData) {
          let responseObject = {
            username: userData.username,
            _id: userData._id,
            count: log.length,
            log
          }
          return res.json(responseObject);
        })
    }
    )
}
let optionalParams = function(req, res, next) {

  let { userId } = req.params;
  let { limit, from, to } = req.query;
  if (from && !limit && !to) {
    ExerciseModel.find({ userId })
      .where('date')
      .gte(new Date(from))
      .exec(function(error, exercisesData) {
        let log = exercisesData.map(function(exercise) {
          return {
            description: exercise.description,
            date: new Date(exercise.date).toDateString(),
            duration: exercise.duration,
          }
        });

        UserModel.findById(userId)
          .exec(function(error, userData) {
            let responseObject = {
              username: userData.username,
              _id: userData._id,
              count: log.length,
              log
            }
            return res.json(responseObject);
          })
      }
      )

  }else if(from && to && !limit){
    ExerciseModel.find({ userId })
      .where('date')
      .gte(new Date(from))
      .lte(new Date(to))
      .exec(function(error, exercisesData) {
        let log = exercisesData.map(function(exercise) {
          return {
            description: exercise.description,
            date: new Date(exercise.date).toDateString(),
            duration: exercise.duration,
          }
        });

        UserModel.findById(userId)
          .exec(function(error, userData) {
            let responseObject = {
              username: userData.username,
              _id: userData._id,
              count: log.length,
              log
            }
            return res.json(responseObject);
          })
      }
      )
  } else if (!from && limit && !to) {

    ExerciseModel.find({ userId })
      .limit(limit)
      .exec(function(error, exercisesData) {
        let log = exercisesData.map(function(exercise) {
          return {
            description: exercise.description,
            date: new Date(exercise.date).toDateString(),
            duration: exercise.duration,
          }
        });

        UserModel.findById(userId)
          .exec(function(error, userData) {
            let responseObject = {
              username: userData.username,
              _id: userData._id,
              count: log.length,
              log
            }
            return res.json(responseObject);
          })
      }
      )
    
  } else if (limit && from && to) {
  ExerciseModel.find({ userId })
      .where('date')
      .gte(new Date(from))
      .lte(new Date(to))
      .limit(limit)
      .exec(function(error, exercisesData) {
        let log = exercisesData.map(function(exercise) {
          return {
            description: exercise.description,
            date: new Date(exercise.date).toDateString(),
            duration: exercise.duration,
          }
        });

        UserModel.findById(userId)
          .exec(function(error, userData) {
            let responseObject = {
              username: userData.username,
              _id: userData._id,
              count: log.length,
              log
            }
            return res.json(responseObject);
          })
      }
      )
  } else {
    next()
  }


}


Router.get('/api/users/:userId/logs', valideUserId, optionalParams,
  function(req, res) {
    let { userId } = req.params;
    detailHandler(userId, req, res);
  })

module.exports = Router; 