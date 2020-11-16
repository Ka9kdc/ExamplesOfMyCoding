const express = require('express');

const { Member, Committee, Badge, Payment } = require('../models');

const router = express.Router();

router.post('/member', async (req, res, next) => {
  try {
    const newMember = await Member.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Callsign: req.body.Callsign,
      Phone: req.body.Phone,
      Street: req.body.Street,
      City: req.body.City,
      State: req.body.State,
      Zip: req.body.Zip,
      Membership: req.body.Membership,
      Email: req.body.Email,
      RenewalDate: req.body.RenewalDate,
      DueYear: req.body.DueYear,
    });
    res.send(newMember);
  } catch (error) {
    next(error);
  }
});

router.post('/family', async (req, res, next) => {
  try {
    const newMember = await Member.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Callsign: req.body.Callsign,
      Phone: req.body.Phone,
      Street: req.body.Street,
      City: req.body.City,
      State: req.body.State,
      Zip: req.body.Zip,
      Membership: req.body.Membership,
      Email: req.body.Email,
      RenewalDate: req.body.RenewalDate,
      DueYear: req.body.DueYear,
    });
    if (req.body.FamilyMembers && req.body.FamilyMembers.length) {
      req.body.FamilyMembers.forEach((member) => {
        newMember.addFamily(member.id);
      });
    }

    res.send(newMember);
  } catch (error) {
    next(error);
  }
});

router.post('/badge', async (req, res, next) => {
  try {
    const badge = req.body.badge;
    const newBadge = await Badge.create({
      Desired: badge.Desired,
      Type: badge.badgeType,
      Arrl: badge.ArrlLogo,
      Color: badge.Color,
      Name: badge.badgeName,
      LicenseYear: badge.LicenseYear,
      RenewalDate: req.body.member.RenewalDate,
    });
    newBadge.setMember(req.body.member.id);
    res.send(newBadge);
  } catch (error) {
    next(error);
  }
});

router.post('/committees', async (req, res, next) => {
  try {
    const groups = req.body.committee;
    const commiteeMember = await Committee.create({
      Hamfest: groups.Hamfest,
      FieldDay: groups.FieldDay,
      PublicService: groups.PublicService,
      MembershipCommittee: groups.MeetingPrograms,
      Publicity: groups.Publicity,
      Fundraising: groups.Fundraising,
      MeetingPrograms: groups.MeetingPrograms,
      ClubOfficer: groups.ClubOfficer,
      HamLetter: groups.HamLetter,
      Website: groups.Website,
      csuTrailer: groups.csuTrailer,
      Repeaters: groups.Repeaters,
      Net: groups.Net,
      Training: groups.Training,
      YouthPrograms: groups.YouthPrograms,
      VEtesting: groups.VEtesting,
      other: groups.other,
    });
    commiteeMember.setMember(req.body.member.id);
    res.send(commiteeMember);
  } catch (error) {
    next(error);
  }
});

router.post('/payment', async (req, res, next) => {
  try {
    let memberId = req.body.contact.id;
    if (req.body.contact.Membership === 'Family')
      memberId = req.body.contact.FamilyMembers[0].id;
    const newPayment = await Payment.create({
      Amount: req.body.amount,
      PaymentDate: req.body.contact.RenewalDate,
      memberId: memberId,
    });
    res.send(newPayment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
