package org.example.strongauto.ui;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequestMapping
@RestController
public class StrongAutoUIController {

  @GetMapping(value = "/**", produces = "text/html")
  public ResponseEntity<String> index() {

    try (var inputStream = new ClassPathResource("dist/index.html").getInputStream()) {

      String html = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

      return ResponseEntity.ok(html);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping(value = "/assets/{path}")
  public ResponseEntity<byte[]> assets(@PathVariable String path) {

    try (var inputStream = new ClassPathResource("dist/assets/%s".formatted(path)).getInputStream()) {

      return ResponseEntity.ok().contentType(resolveContentType(path)).body(inputStream.readAllBytes());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private MediaType resolveContentType(String path) {

    if (path.endsWith(".js")) {
      return MediaType.parseMediaType("text/javascript");
    }

    if (path.endsWith(".png")) {
      return MediaType.IMAGE_PNG;
    }

    if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
      return MediaType.IMAGE_JPEG;
    }

    if (path.endsWith(".svg")) {
      return MediaType.parseMediaType("image/svg+xml");
    }

    if (path.endsWith(".css")) {
      return MediaType.parseMediaType("text/css");
    }

    return MediaType.ALL;
  }

}
