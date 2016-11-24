module Main exposing (..)

import Html exposing (Html, ul, li, button, div, text, program, h3)
import Html.Events exposing (onClick)
import List exposing (map, indexedMap)


-- Model
type alias Meal = -- breakfast, lunch, dinner, &c.
    { expanded: Bool
    , name : String
    , items : List String
    }

type alias Model = List Meal

init : ( Model, Cmd Msg )
init =
    ( [ Meal True "Breakfast" [ "Eggs", "Bacon" ]
      , Meal True "Lunch" [ "Meat", "Potatoes" ]
      , Meal True "Dinner" [ "Steak", "Caviar" ] ]
    , Cmd.none )


-- Messages
type Msg = Expand Int | Collapse Int


-- View
itemsToUl : List String -> Html Msg
itemsToUl items =
    ul [] ( map (\item -> li [] [ item ] ) ( map text items ) )

mealToDiv : Int -> Meal -> Html Msg
mealToDiv idx meal =
    if meal.expanded then
        div []
            [ div [ onClick (Collapse idx) ] [ text meal.name ]
            , itemsToUl meal.items
            ]
    else
        div [] [ div [ onClick (Expand idx) ] [ text meal.name ] ]

view : Model -> Html Msg
view model =
    div []
        [ h3 [] [ text "WM Eats" ]
        , ul [] (indexedMap mealToDiv model)
        ]


-- Update
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        toggle idx expanded i meal =
            if idx == i then
                { meal | expanded = expanded }
            else
                meal
    in
        case msg of
            Expand idx ->
                (indexedMap (toggle idx True) model, Cmd.none)
            Collapse idx ->
                (indexedMap (toggle idx False) model, Cmd.none)


-- Subscription
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


-- Main
main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

