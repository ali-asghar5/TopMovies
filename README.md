# TopMovies
TopMovies is a simplified top movies recommendation application designed to help users see the trend and add films. Developed using .NET 8 and React


## Setting Up Multiple Startup Projects in Visual Studio

You need to run both TopMovies.Api and TopMovies.ReactApp as startup projects in Visual Studio, please follow these steps:

Open the solution in Visual Studio:

1. Open Visual Studio.
- Select File > Open > Project/Solution.
- Navigate to the cloned repository and open the TopMovies.sln file.
2. Configure multiple startup projects:
- In Solution Explorer, right-click on the solution and select Properties.
- In the Solution Property Pages window, select Common Properties > Startup Project.
- Choose the Multiple startup projects option.
- For both TopMovies.Api and TopMovies.ReactApp, set the Action to Start.
- Click Apply and then OK.
3. Build and run the projects:
- Build the solution by selecting Build > Build Solution or pressing Ctrl+Shift+B.
- Start debugging by selecting Debug > Start Debugging or pressing F5.

## Database Configuration
TopMovies uses SQLite database for storage. The database gets created automatically when the API project is first run.

## Future Recommendations
- Add Authentication/Authorization: Secure endpoints to ensure only authorized users have access.
- Add Sign In Feature: Enable authenticated users to perform CRUD operations.
- User Sign Up: Consider using Azure B2C or ASP.NET Core Identity for user management.
- To enhance the security, consider using cloud services such as Azure Key Vault to securely store and manage sensitive information like connection strings, keys, and passwords.
