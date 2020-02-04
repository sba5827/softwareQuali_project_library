package com.mycompany.myapp.cucumber.stepdefs;

import io.cucumber.java.Before;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.mycompany.myapp.web.rest.LibUserResource;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class LibUserStepDefs extends StepDefs {

    @Autowired
    private LibUserResource libUserResource;

    private MockMvc restUserMockMvc;

    @Before
    public void setup() {
        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(libUserResource).build();
    }

    @When("I search LibUser {int}")
    public void i_search_libuser(int userId) throws Throwable {
        actions = restUserMockMvc.perform(get("/api/users/" + userId)
                .accept(MediaType.APPLICATION_JSON));
    }

    @Then("the LibUser is found")
    public void the_libuser_is_found() throws Throwable {
        actions
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
    }
}
