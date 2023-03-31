document.addEventListener('DOMContentLoaded', function () {
  addAllEvents();

}, false);

function addAllEvents() {
  const pwdExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"); 
  const emailExp = new RegExp("^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"); 

  const validClass = "js-valid";
  const invalidClass = "js-invalid";

  const lastName = document.getElementById("lastname");
  const firstName = document.getElementById("firstname");
  const birthDate = document.getElementById("birthdate");
  const userName = document.getElementById("username");
  const userPwd = document.getElementById("userpwd");
  const userEmail = document.getElementById("useremail");

  const form = document.getElementById("signup-form");
  let button = document.getElementById("signup-submit");

  const inputFields = [lastName, firstName, birthDate, userName, userPwd, userEmail];

  inputFields.forEach(field =>
      field.addEventListener("keyup", checkAll)
  );

  [lastName, firstName].forEach(field =>
      field.addEventListener("keyup", checkNoEmpty)
  );

  birthDate.addEventListener("keyup", checkDate);
  userName.addEventListener("keyup", checkUserName);
  userPwd.addEventListener("keyup", checkPwd);
  userEmail.addEventListener("keyup", checkEmail);

  function allowedValues(fieldName, value) {
      switch (fieldName) {
          case("names"):
              return value.length >= 1;
          case("birthdate"):
              return value === "" || value === null || parseMyDate(value);
          case("username"):
              return value.length >= 6;
          case("userpwd"):
              return value.match(pwdExp);
          case("useremail"):
              return value.match(emailExp);
      }
  }

  function parseMyDate(elm) {
      const now = new Date();
      const arr = elm.split("/");
      const date = new Date(arr[2], arr[1] - 1, arr[0]);
      return (
          date.getMilliseconds() === date.getMilliseconds()   
          && arr[0] >= 1 && arr[0] <= 31                      
          && arr[1] >= 1 && arr[1] <= 12                      
          && date.getTime() <= now.getTime() && arr[2] > 1900 
      );
  }

  function checkNoEmpty(e) {
      return check(e.target, allowedValues("names", e.target.value));
  }

  function checkDate(e) {
      return check(e.target, allowedValues("birthdate", e.target.value));
  }

  function checkUserName(e) {
      return check(e.target, allowedValues("username", e.target.value));
  }

  function checkPwd(e) {
      return check(e.target, allowedValues("userpwd", e.target.value));
  }

  function checkEmail(e) {
      return check(e.target, allowedValues("useremail", e.target.value));
  }

  function check(elm, condition) {
      if (condition) {
          if (elm.classList.contains(invalidClass)) {
              elm.classList.remove(invalidClass);
          }
          elm.classList.add(validClass);
          elm.nextElementSibling.hidden = true; 
          return true;
      } else if (!condition) {
          if (elm.classList.contains(validClass)) {
              elm.classList.remove(validClass);
          }
          elm.classList.add(invalidClass);
          elm.nextElementSibling.hidden = false; 
          return false;
      }
  }

  function checkAll() {
      if (
          allowedValues("names", lastName.value)
          && allowedValues("names", firstName.value)
          && allowedValues("birthdate", birthDate.value)
          && allowedValues("username", userName.value)
          && allowedValues("userpwd", userPwd.value)
          && allowedValues("useremail", userEmail.value)
      ) { 
          if (button.disabled === true) { 
              button.disabled = false;
          }
          return true;
      } else { 
          if (button.disabled === false) { 
              button.disabled = true;
          }
          return false;
      }
  }

  form.addEventListener("submit", (e) => {
      if (!checkAll()) {
          e.preventDefault();
          alert("Le formulaire présente un ou plusieurs problèmes");
      } else {
          [lastName, firstName, userName].forEach(field => {
              field.value = field.value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
          });
          form.submit();
      }
  });

  form.addEventListener("reset", () => {
      inputFields.forEach(field => {
          field.nextElementSibling.hidden = true; 
          if (field.classList.contains(invalidClass)) {
              field.classList.remove(invalidClass);
          }
          if (field.classList.contains(validClass)) {
              field.classList.remove(validClass);
          }
          if (button.disabled === false) {
              button.disabled = true;
          }
      });
  });
}