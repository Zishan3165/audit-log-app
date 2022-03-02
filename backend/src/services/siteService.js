import models from '../models/data-models/index.js';
import { connection } from '../mongo.js';
import { BadRequest, NotFound } from '../utils/errors.js';

export const saveSite = async (siteBody, userId) => {
  const session = await connection.startSession();
  try {
    session.startTransaction();
    const siteModel = new models.Site(siteBody);
    const savedSite = await siteModel.save();
    const log = {
      user: userId,
      site: savedSite._id,
      createdAt: new Date(),
      action: 'CREATE',
      details: siteBody
    };
    console.log('created site');
    const logModel = new models.Log(log);
    await logModel.save();
    console.log('saved log for create');
    await session.commitTransaction();
    return savedSite;
  } catch (e) {
    console.log('Transaction failed on create site');
    await session.abortTransaction();
    throw new Error('Internal Server Error');
  }
};

export const getAllSites = async (pageNumber = 0) => {
  const Site = models.Site;
  console.log('sites[0]');
  const sites = await Site.find()
    .limit(25)
    .skip(pageNumber * 25)
    .sort({ name: 1 });
  console.log(sites[0]);
  return sites;
};

export const getSiteById = async (id) => {
  const Site = models.Site;
  try {
    const site = await Site.findById(id);
    return site;
  } catch (e) {
    throw new BadRequest('Invalid Id');
  }
};

export const updateSite = async (site, siteId, userId) => {
  const Site = models.Site;

  let model = await Site.findById(siteId);
  const changedFields = {};
  if (model) {
    if (model.name !== site.name) {
      changedFields.name = site.name;
      model.name = site.name;
    }
    if (model.region !== site.region) {
      changedFields.region = site.region;
      model.region = site.region;
    }
    if (model.description !== site.description) {
      changedFields.description = site.description;
      model.description = site.description;
    }
    if (model.lat !== site.lat) {
      changedFields.lat = site.lat;
      model.lat = site.lat;
    }
    if (model.long !== site.long) {
      changedFields.long = site.long;
      model.long = site.long;
    }

    const session = await connection.startSession();
    try {
      session.startTransaction();
      await model.save();
      console.log('updated site');
      const log = {
        user: userId,
        site: model._id,
        createdAt: new Date(),
        action: 'UPDATE',
        details: changedFields
      };
      const logModel = new models.Log(log);
      await logModel.save();
      console.log('saved log for update');
      await session.commitTransaction();
      return model;
    } catch (e) {
      console.log('Transaction failed on update site', e);
      await session.abortTransaction();
      throw new Error('Internal Server Error');
    }
  } else {
    throw new NotFound('Site does not exist');
  }
};

export const deleteSite = async (siteId, userId) => {
  const Site = models.Site;
  let model = await Site.findById(siteId);
  if (model) {
    try {
      const session = await connection.startSession();
      session.startTransaction();

      const log = {
        user: userId,
        site: model._id,
        createdAt: new Date(),
        action: 'DELETE',
        details: model
      };
      const logModel = new models.Log(log);
      await logModel.save();
      console.log('saved log for delete');

      const result = await Site.deleteOne({ _id: siteId });
      console.log('deleted site');

      await session.commitTransaction();
      return result;
    } catch (e) {
      console.log('Transaction failed on delete site');
      await session.abortTransaction();
      throw new Error('Internal Server Error');
    }
  } else {
    throw new NotFound('Site does not exist');
  }
};
