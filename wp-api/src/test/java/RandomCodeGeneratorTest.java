import com.project.wp_api.service.mail.MailService;
import com.project.wp_api.service.mail.NaverMailService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RandomCodeGeneratorTest {

    private final MailService mailService = new NaverMailService();

    @Test
    void Generate() {
        for (int i = 0; i < 100; i++) {
            generateAndCheck();
        }
    }

    void generateAndCheck() {
        var randomCode = mailService.generateVerificationCode();

        for (int i = 0; i < randomCode.length(); i++) {
            var number = randomCode.charAt(i);
            var count = randomCode.chars().filter(elem -> elem == number).count();
            Assertions.assertEquals(1, count);
        }
    }
}
