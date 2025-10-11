import com.project.wp_common.logManage.WpLogManager;
import com.project.wp_common.logManage.WpLogger;
import org.junit.jupiter.api.Test;

public class LoggerTest {

    private static final WpLogger logger = WpLogManager.getClassLogger(LoggerTest.class);

    @Test
    public void testMethod() {
        logger.forInfoLog()
              .message("what")
              .parameter("the")
              .parameter("hell")
              .log();
    }
}
