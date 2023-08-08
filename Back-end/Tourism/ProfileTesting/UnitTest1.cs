using Microsoft.AspNetCore.Mvc;
using Moq;
using Profile.Controllers;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Profile.Tests
{
    public class ProfileControllerTests
    {
        private readonly Mock<IProService> _profileServiceMock;
        private readonly ProfileController _profileController;

        public ProfileControllerTests()
        {
            _profileServiceMock = new Mock<IProService>();
            _profileController = new ProfileController(_profileServiceMock.Object);
        }

        [Fact]
        public async Task GetProfile_ReturnsListOfProfiles()
        {
            // Arrange
            var expectedProfiles = new List<Profiles>
            {
                 new Profiles { customer_id = 1, name = "John Doe" },
                 new Profiles { customer_id = 2, name = "Jane Smith" }
            };
            _profileServiceMock.Setup(service => service.GetProfile())
                .ReturnsAsync(expectedProfiles);

            // Act
            var result = await _profileController.GetProfile();

            // Assert
            var okResult = Assert.IsType<List<Profiles>>(result);
            Assert.Equal(expectedProfiles.Count, okResult.Count);
            // Add more specific assertions as needed
        }


        [Fact]
        public async Task DeleteProfile_ValidId_ReturnsProfile()
        {
            // Arrange
            int profileId = 1;
            var expectedProfile = new Profiles { customer_id = profileId };
            _profileServiceMock.Setup(service => service.DeleteProfile(profileId))
                .ReturnsAsync(expectedProfile);

            // Act
            var result = await _profileController.DeleteProfile(profileId);

            // Assert
            var okResult = Assert.IsType<Profiles>(result);
            Assert.Equal(expectedProfile.customer_id, okResult.customer_id);
            // Add more specific assertions as needed
        }


        [Fact]
        public async Task GetProfileById_ValidId_ReturnsProfile()
        {
            // Arrange
            int profileId = 1;
            var expectedProfile = new Profiles { customer_id = profileId };
            _profileServiceMock.Setup(service => service.GetProfileById(profileId))
                .ReturnsAsync(expectedProfile);

            // Act
            var result = await _profileController.GetProfileById(profileId);

            // Assert
            var okResult = Assert.IsType<Profiles>(result);
            Assert.Equal(expectedProfile.customer_id, okResult.customer_id);
            // Add more specific assertions as needed
        }


        // Add test cases for other methods in a similar manner...

        // Example test for Login method
        [Fact]
        public async Task Login_ValidUser_ReturnsOkResult()
        {
            // Arrange
            var authDto = new Auth_DTO { email_id = "testuser", password = "testpassword" };
            var expectedToken = "samplejwttoken";
            _profileServiceMock.Setup(service => service.Login(authDto))
                .ReturnsAsync(new LoginResponse_DTO { Token = expectedToken });

            // Act
            var result = await _profileController.Login(authDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualResponse = Assert.IsAssignableFrom<LoginResponse_DTO>(okResult.Value);
            Assert.Equal(expectedToken, actualResponse.Token);
            // Add more specific assertions as needed
        }

        [Fact]
        public async Task Login_InvalidUser_ReturnsBadRequestResult()
        {
            // Arrange
            var authDto = new Auth_DTO { email_id = "invaliduser", password = "invalidpassword" };
            _profileServiceMock.Setup(service => service.Login(authDto))
                .ReturnsAsync((LoginResponse_DTO)null);

            // Act
            var result = await _profileController.Login(authDto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            // Add more specific assertions as needed
        }

        [Fact]
        public async Task PutLogin_ValidId_ReturnsOkResult()
        {
            // Arrange
            int profileId = 1;
            var loginDto = new Login_DTO { customer_id = profileId, email_id = "testuser", mobile_number = 8374837483 };
            var updatedLoginDto = new Login_DTO { customer_id = profileId, email_id = "updateduser", mobile_number = 9485746574 };
            _profileServiceMock.Setup(service => service.PutLogin(loginDto, profileId))
                .ReturnsAsync(updatedLoginDto);

            // Act
            var result = await _profileController.PutLogin(profileId, loginDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualLoginDto = Assert.IsAssignableFrom<Login_DTO>(okResult.Value);
            Assert.Equal(updatedLoginDto.customer_id, actualLoginDto.customer_id);
            Assert.Equal(updatedLoginDto.email_id, actualLoginDto.email_id);
            Assert.Equal(updatedLoginDto.mobile_number, actualLoginDto.mobile_number);
            // Add more specific assertions as needed
        }

        [Fact]
        public async Task Register_ValidDto_ReturnsOkResult()
        {
            // Arrange
            var registerDto = new Register_DTO
            {

                email_id = "john.doe@example.com",
                password = "TestPassword123",
                role = "user",
                // Add other required properties
            };
            var expectedLoginDto = new Register_DTO
            {
                email_id = "john.doe@example.com",
                password = "TestPassword123",
                role = "user",
            };
            _profileServiceMock.Setup(service => service.RegisterUser(registerDto))
                .ReturnsAsync(expectedLoginDto);

            // Act
            var result = await _profileController.Register(registerDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualLoginDto = Assert.IsAssignableFrom<Register_DTO>(okResult.Value);
            Assert.Equal(expectedLoginDto.email_id, actualLoginDto.email_id);
            Assert.Equal(expectedLoginDto.password, actualLoginDto.password);
            Assert.Equal(expectedLoginDto.role, actualLoginDto.role);
            // Add more specific assertions as needed
        }

        [Fact]
        public async Task Register_InvalidDto_ReturnsBadRequestResult()
        {
            // Arrange
            var invalidDto = new Register_DTO
            {
                email_id = "john.doe@example.com",
                password = "TestPassword123",
                role = "user",
            };
            _profileController.ModelState.AddModelError("Error", "Invalid DTO");

            // Act
            var result = await _profileController.Register(invalidDto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            // Add more specific assertions as needed
        }

        [Fact]
        public async Task GetLoginById_NonExistingId_ReturnsNotFoundResult()
        {
            // Arrange
            int nonExistingProfileId = 1000; // Assuming 1000 is a non-existing profile ID
            _profileServiceMock.Setup(service => service.GetLoginById(nonExistingProfileId))
                .ReturnsAsync((Login_DTO)null);

            // Act
            var result = await _profileController.GetLoginById(nonExistingProfileId);

            // Assert
            Assert.IsType<ActionResult<Login_DTO>>(result);
            var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value); // Ensure the Value property is null

        }

        [Fact]
        public async Task UpdateImage_ExistingId_ReturnsOkResult()
        {
            // Arrange
            int profileId = 1;
            var changeImgDto = new ChangeImg_DTO
            {
                image = "jes.jpg"
            };
            var updatedImage = new ChangeImg_DTO
            {
                image = "helo.jpg"
            };
            _profileServiceMock.Setup(service => service.UpdateImage(profileId, changeImgDto))
                .ReturnsAsync(updatedImage);

            // Act
            var result = await _profileController.UpdateImage(profileId, changeImgDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUpdatedImage = Assert.IsAssignableFrom<ChangeImg_DTO>(okResult.Value);
            Assert.Equal(updatedImage.image, actualUpdatedImage.image);
            Assert.Equal(updatedImage.image, actualUpdatedImage.image);
            // Add more specific assertions as needed for other properties
        }

        [Fact]
        public async Task UpdateImage_NonExistingId_ReturnsNotFoundResult()
        {
            // Arrange
            int nonExistingProfileId = 1000; // Assuming 1000 is a non-existing profile ID
            var changeImgDto = new ChangeImg_DTO
            {
                customer_id = 1,
                image = "https://example.com/images/profile1.jpg",
            };
            _profileServiceMock.Setup(service => service.UpdateImage(nonExistingProfileId, changeImgDto))
                .ThrowsAsync(new Exception()); // Simulate exception for non-existing ID

            // Act
            var result = await _profileController.UpdateImage(nonExistingProfileId, changeImgDto);

            // Assert
            Assert.IsType<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.Equal(500, objectResult.StatusCode); // Verify status code
        }




        [Fact]
        public async Task GetProById_ExistingId_ReturnsOkResult()
        {
            // Arrange
            int profileId = 1;
            var profileDto = new Profile_DTO
            {
                customer_id = 1,
                gender = "male",
                name = "Test",
            };
            _profileServiceMock.Setup(service => service.GetProById(profileId))
                .ReturnsAsync(profileDto);

            // Act
            var result = await _profileController.GetProById(profileId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfileDto = Assert.IsAssignableFrom<Profile_DTO>(okResult.Value);
            Assert.Equal(profileDto.customer_id, actualProfileDto.customer_id);
            Assert.Equal(profileDto.gender, actualProfileDto.gender);
            Assert.Equal(profileDto.name, actualProfileDto.name);
        }

        [Fact]
        public async Task GetProById_NonExistingId_ReturnsNotFoundResult()
        {
            // Arrange
            int nonExistingProfileId = 1000; // Assuming 1000 is a non-existing profile ID
            _profileServiceMock.Setup(service => service.GetProById(nonExistingProfileId))
                .ReturnsAsync((Profile_DTO)null);

            // Act
            var result = await _profileController.GetProById(nonExistingProfileId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
