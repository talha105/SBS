package com.sbs;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.TextRecognizerOptionsInterface;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.Text.Element;
import com.google.mlkit.vision.text.Text.Line;
import com.google.mlkit.vision.text.Text.TextBlock;

public class MLkitModule extends ReactContextBaseJavaModule {
   MLkitModule(ReactApplicationContext context) {
       super(context);
   }
   public String getName() {
   return "MLkitModule";
}

public writableMap getRectMap(Rect,rect){
    writableMap rectObject=Arguments.createMap();
    rectObject.putInt('left',rect.left);
    rectObject.putInt('top',rect.top);
    rectObject.putInt('width',rect.right-rect.left);
    rectObject.putInt('height',rect.bottom-rect.top);
    return rectObject;
}

@ReactMethod
public void imageToText(String url,) {
    Uri uri = Uri.parse(url);
    InputImage image;
    try {
        image = InputImage.fromFilePath(getReactApplicationContext(), uri);
        TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
        recognizer.process(image)
                .addOnSuccessListener(new OnSuccessListener<Text>() {
                    @Override
                    public void onSuccess(Text result) {
                        writableMap response= Arguments.createMap();
                        response.putInt("width",image.getWidth);
                        response.putInt("height",image.height);

                        writableArray blocks= Arguments.createArray();

                        for (Text.TextBlock block : result.getTextBlocks()) {

                            writableMap blockObject= Arguments.createMap();
                            blockObject.putArray("text",block.getText());
                            blockObject.putMap("rect",getRectMap(block.getBoundingBox()));

                            writableArray lines= Arguments.createArray();
                            for (Text.Line line : block.getLines()) {
                                writableMap lineObject= Arguments.createMap();
                                blockObject.putArray("text",line.getText());
                                blockObject.putMap("rect",getRectMap(line.getBoundingBox()));
                                lines.pushMap(lineObject);
                            }
                            blockObject.putArray("lines",lines);
                            blocks.pushMap(blockObject);
                        }
                        response.putArray("blocks",blocks);
                        promise.resolve(response);
                    }
                })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                promise.reject("failed to reg",e);
                            }
                        });
    } catch (IOException e) {
        e.printStackTrace();
    }
}


}