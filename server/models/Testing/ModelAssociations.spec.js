const { expect, assert } = require('chai');
const {
  db,
  Member,
  Badge,
  Committee,
  Payment,
  User,
  Vendor,
  Order,
  Ticket,
  Attendee,
  Annoucement,
} = require('..');

//Tests: 16 passing 0 pending/failing
describe('Model Relationships', () => {
  const today = new Date();
  const payment = { PaymentDate: today, Amount: 20 };
  let testPayment;
  let testMember;
  const member = {
    FirstName: 'Hannah',
    LastName: 'Green',
    Callsign: 'Ka9ddd',
    Phone: '1234567890',
    Street: '123 happy lane',
    City: 'st upidtown',
    State: 'MA',
    Zip: 60606,
    Membership: 'Full',
    Email: 'abcde123@abc.com',
    DueYear: 2020,
    RenewalDate: today,
  };

  describe('Membership Models - member, badge, committees and payment', () => {
    beforeEach(async () => {
      testMember = await Member.create(member);
      testPayment = await Payment.create(payment);
    });
    const badge = {
      Desired: true,
      Name: 'Cody',
      Arrl: true,
      Color: 'Red',
      Type: 'Lanyard',
      LicenseYear: 2000,
      RenewalDate: today,
    };
    const committee = { Hamfest: true, FieldDay: true };
    it('Member has one badge', async () => {
      const testBadge = await Badge.create(badge);

      await testBadge.setMember(testMember);

      const Matched = await testBadge.getMember();

      expect(Matched.FirstName).to.equal('Hannah');
      assert.deepEqual(Matched.RenewalDate, testBadge.RenewalDate);
    });
    it('Member has one committee', async () => {
      const testcommittees = await Committee.create(committee);
      await testcommittees.setMember(testMember);
      const matched = await testcommittees.getMember();
      expect(matched.FirstName).to.equal('Hannah');
    });
    it('member can have many members through familyMembers', async () => {
      const testFamily = await Member.create({
        FirstName: 'Cody',
        LastName: 'Green',
        Callsign: 'Ka9aaa',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'Code123@abc.com',
        DueYear: 2020,
        RenewalDate: today,
      });
      await testMember.setFamily(testFamily);
      const family = await testMember.getFamily();
      expect(family[0].FirstName).to.equal('Cody');
    });
    it('Member has one payment', async () => {
      await testPayment.setMember(testMember);
      const matched = await testPayment.getMember();
      expect(matched.FirstName).to.equal('Hannah');
      assert.deepEqual(matched.RenewalDate, testPayment.PaymentDate);
    });
    it('Member has one user', async () => {
      const testuser = await User.create({
        Callsign: testMember.Callsign,
        Email: testMember.Email,
        Name: testMember.FirstName,
        password: '123456',
      });
      await testuser.setMember(testMember);
      const matched = await testuser.getMember();
      expect(matched.FirstName).to.equal('Hannah');
    });
  });
  describe('Hamfest Vendor Associations', () => {
    let testVendor;
    let testOrder;
    beforeEach(async () => {
      testVendor = await Vendor.create({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        OrderDate: today,
      });
      testOrder = await Order.create({
        Tickets: 1,
        Tables: 1,
        Chairs: 1,
        Electical: true,
        Raffle: 1,
        Amount: payment.Amount,
        OrderDate: today,
      });
      testPayment = await Payment.create(payment);
      await testOrder.setVendor(testVendor);
      await testPayment.setVendor(testVendor);
      await testPayment.setOrder(testOrder);
    });
    it('vendor can have one order', async () => {
      const matched = await testOrder.getVendor();
      expect(matched.Name).to.equal('Hannah');
      assert.deepEqual(matched.OrderDate, testOrder.OrderDate);
    });
    it('Vendor has one Payment', async () => {
      const matched = await testPayment.getVendor();
      expect(matched.Name).to.equal('Hannah');
      assert.deepEqual(matched.OrderDate, testPayment.PaymentDate);
    });
    it('Order has one Payment', async () => {
      const matched = await testPayment.getOrder();
      expect(matched.Amount).to.equal(20);
      assert.deepEqual(matched.OrderDate, testPayment.PaymentDate);
    });
    it('Payment has both an order and a vendor with the same date', async () => {
      const matchedVendor = await testPayment.getVendor();
      const matchedOrder = await testPayment.getOrder();
      expect(matchedVendor.Name).to.equal('Hannah');
      expect(matchedOrder.Amount).to.equal(20);
      assert.deepEqual(matchedOrder.OrderDate, matchedVendor.OrderDate);
    });
  });
  describe('Hamfest Attendee Associations', () => {
    let testAttendee;
    let testTicket;
    beforeEach(async () => {
      testAttendee = await Attendee.create({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Email: 'abcde123@abc.com',
        OrderDate: today,
      });
      testTicket = await Ticket.create({
        Tickets: 1,
        Raffle: 1,
        Amount: payment.Amount,
        OrderDate: today,
      });
      testPayment = await Payment.create(payment);
      await testTicket.setAttendee(testAttendee);
      await testPayment.setAttendee(testAttendee);
      await testPayment.setTicket(testTicket);
    });
    it('Attendee can have one ticket order', async () => {
      const matched = await testTicket.getAttendee();
      expect(matched.Name).to.equal('Hannah');
      assert.deepEqual(matched.OrderDate, testTicket.OrderDate);
    });

    it('Attendee has one Payment', async () => {
      const matched = await testPayment.getAttendee();
      expect(matched.Name).to.equal('Hannah');
      assert.deepEqual(matched.OrderDate, testPayment.PaymentDate);
    });
    it('Ticket has one Payment', async () => {
      const matched = await testPayment.getTicket();
      expect(matched.Amount).to.equal(20);
      assert.deepEqual(matched.OrderDate, testPayment.PaymentDate);
    });
    it('Payment has both an ticket and a Attendee with the same date', async () => {
      const matchedAttendee = await testPayment.getAttendee();
      const matchedTicket = await testPayment.getTicket();
      expect(matchedAttendee.Name).to.equal('Hannah');
      expect(matchedTicket.Amount).to.equal(20);
      assert.deepEqual(matchedTicket.OrderDate, matchedAttendee.OrderDate);
    });
  });
  describe('User - Announcement', () => {
    let testuser;
    before(async () => {
      await db.sync({ force: true });
      testMember = await Member.create(member);
      testuser = await User.create({
        Callsign: testMember.Callsign,
        Email: testMember.Email,
        Name: testMember.FirstName,
        password: '123456',
      });
      await testuser.setMember(testMember);
      const testAnnouncement1 = await Annoucement.create({
        borderColor: '#ff0000',
        backgroundColor: '#00ff00',
        message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
        PostDate: today,
      });
      const testAnnouncement2 = await Annoucement.create({
        borderColor: '#ff00aa',
        backgroundColor: '#00ff00',
        message: 'asdf asdf asdf',
        PostDate: today,
      });
      const testAnnouncement3 = await Annoucement.create({
        borderColor: '#ff0004',
        backgroundColor: '#00ff00',
        message: 'lkjhg lkjhgf lkjhgf asdf asdf asdf asdf asdf asdf asdf asdf',
        PostDate: today,
      });
      await testAnnouncement1.setUser(testuser.id);
      await testAnnouncement2.setUser(testuser.id);
      await testAnnouncement3.setUser(testuser.id);
    });
    it('user can have many Announcements', async () => {
      const announcementCount = await testuser.countAnnoucements();
      expect(announcementCount).to.equal(3);
    });
    it('user can have many', async () => {
      const matched = await testuser.getAnnoucements();
      let matchedAnnoucements = [];
      for (let i = 0; i < matched.length; i++) {
        matchedAnnoucements.push(matched[i].borderColor);
      }
      expect(matchedAnnoucements).to.deep.equal([
        '#ff0000',
        '#ff00aa',
        '#ff0004',
      ]);
    });
    it('user has a member', async () => {
      const match = await testuser.getMember();
      expect(match.FirstName).to.equal('Hannah');
    });
  });
});
