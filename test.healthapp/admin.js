describe('Administrator landing page', function() {
  var url = 'https://healthapp-cen3031-7b.herokuapp.com/';
  /* Since there are two userForms on the page (contact us modal as well as create user modal),
   * the create user modal is specified as 1
   */
  var form = element.all(by.name('userForm')).get(1);
  // Ensures that each it statement is tested separately
  beforeEach(function() {
    browser.get(url+'admin_landing');
  });
  // Testing the routes and redirection
  it('should redirect to admin landing page', function() {
    expect(browser.driver.getCurrentUrl() === url+'admin_landing');
  });
  // Redirects to own landing page instead of landing page of other privileges'
  it('should not see other landing pages of other states', function() {
    browser.get(url);
    expect(browser.driver.getCurrentUrl() === url+'admin_landing');
    
    browser.get(url+'patients');
    expect(browser.driver.getCurrentUrl() === url+'admin_landing');
  });
  // Buttons tested if they go to the proper page/modal
  describe('Buttons when clicked', function() {
    // Patient Portal
    it('should go to patient portal', function() {
      element(by.cssContainingText('.button_admin', 'Manage Patient')).click();
      expect(browser.driver.getCurrentUrl() === url+'patients');
    });
    // Enter information to create an admin
    it('should go to create user modal and create admin', function() {
      element(by.buttonText('Create User')).click().then(function() {
        expect(element(by.css('.signin')).isPresent()).toBe(true);
        element.all(by.model('credentials.username')).get(1).sendKeys('protractorusername');
        element(by.model('credentials.firstName')).sendKeys('Protractor');
        element(by.model('credentials.lastName')).sendKeys('Username');
        element(by.model('credentials.email')).sendKeys('testing@iscool.com');
        element.all(by.model('credentials.password')).get(1).sendKeys('1qaz@WSX3edc');
        element(by.model('credentials.admin')).click().then(function() {
          expect(element(by.model('credentials.admin')).isSelected()).toBeTruthy();
        });
        element(by.buttonText('Create')).click().then(function() {
          expect(form.submit());
        });
      });
    });
    // Enter information to create a regular user
    it('should go to create user modal and create non-admin user', function() {
      element(by.buttonText('Create User')).click().then(function() {
        expect(element(by.css('.signin')).isPresent()).toBe(true);
        element.all(by.model('credentials.username')).get(1).sendKeys('protractornonadmin');
        element(by.model('credentials.firstName')).sendKeys('Protractor');
        element(by.model('credentials.lastName')).sendKeys('Nonadmin');
        element(by.model('credentials.email')).sendKeys('testing@isnecessary.com');
        element.all(by.model('credentials.password')).get(1).sendKeys('1qaz@WSX3edc');
        expect(element(by.model('credentials.admin')).isSelected()).toBeFalsy();
      });
      element(by.buttonText('Create')).click().then(function() {
        expect(form.submit());
      });
    });
    // User Portal
    it('should go to user portal', function() {
      element(by.cssContainingText('.button_admin', 'Manage User')).click();
      expect(browser.driver.getCurrentUrl() === url+'users');
    });
  });
  
  // Testing the contact us modal buttons and alerts
  describe('Contact form', function() {
    // Tests each function individually
    beforeEach(function() {
      browser.get(url+'admin_landing');
    });
    var nameField = element(by.model('message.user'));
    var messageField = element(by.model('message.text'));
    var form = element(by.name('contactForm'));
    // Error messages appear if name field is blank
    it('should open contact us modal and display error message(s)', function() {
      element(by.buttonText('Contact Us')).click().then(function() {
        element(by.buttonText('Send')).click().then(function() {
          expect(element(by.css('.modal-content')).isDisplayed()).toBeTruthy();
        });
      });
    });
    // Opens email client with filled out fields
    it('should send if both fields are not blank', function() {
      element(by.buttonText('Contact Us')).click();
      nameField.sendKeys('Admin Sammantha Yjynnynn');
      messageField.sendKeys('Details about my concerns');
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
    });
  });
});