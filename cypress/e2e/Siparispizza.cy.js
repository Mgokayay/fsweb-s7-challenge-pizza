describe("Metin Girişi Testi", () => {
  it("Bir metin alanına metin girmeli", () => {
    cy.visit("http://localhost:3000/pizza");

    cy.get("#special-text").type("Lütfen hızlı olunuz!");

    cy.get("#special-text").should("have.value", "Lütfen hızlı olunuz!");
  });
});

describe("Boyut seçimi", () => {
  it("Bir boyut seçimi yapılmalı", () => {
    cy.visit("http://localhost:3000/pizza");

    cy.get("#large").click(["Büyük"]);

    cy.get("input[type='radio']").filter(":checked");
  });

  describe("Form Gönderme Testi", () => {
    it("Form gönderilmeli", () => {
      cy.visit("http://localhost:3000/pizza");

      cy.get("#order-button").click();

      cy.url().should("not.include", "/success");

      cy.contains("Toplam");
    });
  });
});
