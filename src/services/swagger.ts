import { APP } from "../variables/constants";

export const swaggerJSON = {
  openapi: "3.0.0",
  info: {
    title: "NodeSQL",
    version: "1.0.0",
  },
  servers: [
    {
      url: APP.APP_URL,
    },
  ],
  tags: [
    {
      name: "Auth",
    },
  ],
  paths: {
    "/api/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Signup",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "test",
                  email: "test@mailinator.com",
                  password: "aA@12345",
                  confirm_password: "aA@12345",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "test@mailinator.com",
                  password: "aA@12345",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
  },
};
