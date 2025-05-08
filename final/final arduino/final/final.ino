const int joystickXPin = A0; // Joystick X-axis on pin A0
const int buttonPin = 4;     // Button on pin 4
const int buzzerPin = 8;     // Buzzer on pin 8

unsigned long buzzerStartTime = 0; 
bool buzzerActive = false;         
bool buzzerState = LOW;            
unsigned long lastPulseTime = 0;   
const unsigned long pulseInterval = 2500; // 2.5ms (200 Hz)
const unsigned long buzzDuration = 300;   // 300ms total

void setup() {
  digitalWrite(buzzerPin, LOW);
  pinMode(buzzerPin, OUTPUT);
  digitalWrite(buzzerPin, LOW); // Ensure buzzer is off

  pinMode(buttonPin, INPUT);          

  Serial.begin(9600);
  while (Serial.available() > 0) {
    Serial.read();
  }
}

void loop() {
  // Read joystick nd button
  int xVal = analogRead(joystickXPin); 
  int buttonState = digitalRead(buttonPin); 

  Serial.print("X:");
  Serial.print(xVal);
  Serial.print(",B:");
  Serial.println(buttonState == LOW ? 0 : 1);

  // serial input from p5
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    if (command == "Z:1" && !buzzerActive) {
      buzzerActive = true;
      buzzerStartTime = millis();
      buzzerState = HIGH;
      digitalWrite(buzzerPin, HIGH);
      lastPulseTime = micros();
    }
  }

  // Handle non-blocking buzzer pulsing
  if (buzzerActive) {
    unsigned long currentTime = micros();
    if (currentTime - lastPulseTime >= pulseInterval) {
      buzzerState = !buzzerState; 
      digitalWrite(buzzerPin, buzzerState);
      lastPulseTime = currentTime;
    }
    if (millis() - buzzerStartTime >= buzzDuration) {
      buzzerActive = false;
      digitalWrite(buzzerPin, LOW);
    }
  }

  delay(20); 
}