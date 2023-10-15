# Task 1

You have a React component that uses useRef and IntersectionObserver to determine when the user has viewed the end of the content. Your task is as follows:

Set the correct prop types for this component. It has two properties: children and onContentEndVisible. children is any valid React node and onContentEndVisible is a function with no arguments that returns void.

Set the correct useRef type. The endContentRef reference is used for the div that is at the end of the content.

Set the correct type for options (a class can also be a type for options).

```ts
import React, { useEffect, useRef } from "react";

// Describe the Props
export function Observer({ children, onContentEndVisible }: Props) {
   // Specify the correct type for useRef, pay attention to which DOM element we pass it to
   const endContentRef = useRef(null);

   useEffect(() => {
     // Specify the correct type for options, hint, class can also be specified as a type
     const options = {
       rootMargin: "0px",
       threshold: 1.0,
       root: null,
     };

     const observer = new IntersectionObserver((entries) => {
       entries.forEach((entry) => {
         if (entry.intersectionRatio > 0) {
           onContentEndVisible();
           observer.disconnect();
         }
       });
     }, options);

     if (endContentRef.current) {
       observer.observe(endContentRef.current);
     }

     return () => {
       observer.disconnect();
     };
   }, [onContentEndVisible]);

   return (
     <div>
       {children}
       <div ref={endContentRef} />
     </div>
   );
}
```

# Task 2

Your task is to add types for the following code elements:

RequestStep: This is a string literal.

State: This type is an object with two properties isRequestInProgress and RequestStep

Action: This is a type representing the possible actions that can be sent to the reducer.

Look at the code and describe the correct types for it.

```ts
import React, { useReducer } from "react";

const initialState: State = {
   isRequestInProgress: false,
   requestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
   switch (action.type) {
     case "START_REQUEST":
       return { ...state, isRequestInProgress: true, requestStep: "start" };
     case "PENDING_REQUEST":
       return { ...state, isRequestInProgress: true, requestStep: "pending" };
     case "FINISH_REQUEST":
       return { ...state, isRequestInProgress: false, requestStep: "finished" };
     case "RESET_REQUEST":
       return { ...state, isRequestInProgress: false, requestStep: "idle" };
     default:
       return state;
   }
}

export function RequestComponent() {
   const [requestState, requestDispatch] = useReducer(
     requestReducer,
     initialState
   );

   const startRequest = () => {
     requestDispatch({ type: "START_REQUEST" });
     // Simulate a request to the server
     setTimeout(() => {
       requestDispatch({ type: "PENDING_REQUEST" });
       // We simulate receiving a response from the server
       setTimeout(() => {
         requestDispatch({ type: "FINISH_REQUEST" });
       }, 2000);
     }, 2000);
   };

   const resetRequest = () => {
     requestDispatch({ type: "RESET_REQUEST" });
   };

   return (
     <div>
       <button onClick={startRequest}>Start request</button>
       <button onClick={resetRequest}>Reset request</button>
       <p>Request state: {requestState.requestStep}</p>
     </div>
   );
}

export default RequestComponent;
```

# Task 3

You create a form component in React. You have an input field that you want to track changes to. To do this, you use the onChange event handler. Your task is to correctly type the event that is passed to this function.

```ts
import React, { useState } from "react";

export function FormComponent() {
   const [value, setValue] = useState("");

   const handleChange = (event) => {
     setValue(event.target.value);
   };

   return <input type="text" value={value} onChange={handleChange} />;
}
```

# Task 4

You've decided to apply context to your menu and now you need to type it.

Describe the SelectedMenu type: This must be an object that contains an id with a MenuIds type

Describe the MenuSelected type: This type is an object that contains selectedMenu

Describe the MenuAction type: This type is an object with an onSelectedMenu method that accepts an object of type SelectedMenu as an argument and returns void.

Describe the PropsProvider type: Describe the correct type for children

Describe the type of PropsMenu: Describe the type for menus, it must be of type Menu
