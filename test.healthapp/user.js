describe('Tests for user landing', function() {
  var url = 'https://healthapp-cen3031-7b.herokuapp.com/';
  // Functionalities are tested separately
  beforeEach(function() {
    browser.get(url+'patients');
  });
  // Testing the routes and redirection
  it('should redirect to patient portal', function() {
    expect(browser.driver.getCurrentUrl() === url+'patients');
  });
  // Redirects to own landing page
  it('should not see other landing pages of other states', function() {
    // Should not go to other privileges' landing page
    browser.get(url);
    expect(browser.driver.getCurrentUrl() === url+'patients');
    
    browser.get(url+'admin_landing');
    expect(browser.driver.getCurrentUrl() === url+'patients');

    // Test features of Patient Portal - last name filter
    it('should filter patients by last name', function() {
      var search = element(by.className('patientfilter'));
      search.sendKeys('newman');
      var lastname = element(by.binding('patient.lastname'));
      lastname.getText().then(function(text) {
        expect(search == lastname);
      });
    });
    // Test link
    it('should be able to go from survey page back to patient portal', function() {
      element(by.buttonText('Give Survey')).click().then(function() {
        expect(browser.driver.getCurrentUrl() === url+'patients/create');
        element(by.linkText('Back to Patient Portal')).click().then(function() {
          expect(browser.driver.getCurrentUrl() === url+'patients');
        });
      });
    });
  });
  // Testing the contact us modal buttons and alerts
  describe('Contact form', function() {
    beforeEach(function() {
      browser.driver.get(url+'patients');
    });
    var nameField = element(by.model('message.user'));
    var messageField = element(by.model('message.text'));
    var form = element(by.name('contactForm'));
    // Display error popovers
    it('should open contact us modal and display error message(s)', function() {
      element(by.buttonText('Contact Us')).click().then(function() {
        element(by.buttonText('Send')).click().then(function() {
          expect(element(by.css('.modal-content')).isDisplayed()).toBeTruthy();
        });
      });
    });
    // Open email client with filled out fields
    it('should send if both fields are not blank', function() {
      element(by.buttonText('Contact Us')).click();
      nameField.sendKeys('User Allyynn Cyynndyy');
      messageField.sendKeys('Details about my concerns');
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
    });
  });
});