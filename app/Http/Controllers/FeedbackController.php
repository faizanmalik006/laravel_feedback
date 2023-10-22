<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return Feedback::where('user_id', $user->id)->with('comments')->paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request)
    {
        $result = Feedback::create($request->validated());
        $feedback = Feedback::where('id', $result->id)->first();

        return response(["feedback" => $feedback]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        //
    }

    public function addVote(Feedback $feedback)
    {
        $voted = false;
        $user = Auth::user();
        $userVotes = $user->votes;
        $feedbackVotes = $feedback->votes;

        foreach ($userVotes as $vote) {
            if ($vote === $feedback->id) {
                $voted = true;
            }
        }

        if ($voted) {
            $index = array_search('string3', $userVotes);
            if ($index !== FALSE) {
                unset($userVotes[$index]);
            }
            $feedbackVotes = $feedbackVotes - 1;
        } else {
            array_push($userVotes, $feedback->id);
            $feedbackVotes = $feedbackVotes + 1;
        }

        User::where('id', $user->id)->update([
            'votes' => $userVotes
        ]);

        Feedback::where('id', $feedback->id)->update([
            'votes' => $feedbackVotes
        ]);

        return response([
            'success' => true
        ]);
    }
}
